import type {
	binanceMarket,
	exchangeFutureDataT,
} from 'src/app';

function convert_binance_shitty_expiry_string_to_timestamp(expiry: string) {
	return Date.parse(
		("20" + expiry).slice(0, 4) + "-" + expiry.slice(2, 4) + "-" + expiry.slice(4, 6)
	);
}
export async function get_binance_futs() {
	const [dated_resp, perp_resp] = await Promise.all([
		fetch('https://www.binance.com/dapi/v1/premiumIndex'),
		fetch('https://fapi.binance.com/fapi/v1/premiumIndex')
	])
	const d_json: binanceMarket[] = await dated_resp.json();
	const p_json: binanceMarket[] = await perp_resp.json();
	const perp_markets: exchangeFutureDataT[] =
		p_json.reduce((result: exchangeFutureDataT[], element: binanceMarket) => {
			if (element.nextFundingTime !== 0) {
				result.push({
					exchange: 'binance',
					name: element.symbol,
					type: 'perpetual',
					mark: JSON.parse(element.markPrice),
					index: JSON.parse(element.indexPrice),
					expiry: undefined,
					funding_rate: JSON.parse(element.lastFundingRate)
				} as exchangeFutureDataT)
			}
			return result
		}, [])
	const dated_markets: exchangeFutureDataT[] =
		d_json.reduce((result: exchangeFutureDataT[], element: binanceMarket) => {
			const maybe_date =
				convert_binance_shitty_expiry_string_to_timestamp(element.symbol.slice(-6));
			if (maybe_date) {
				result.push({
					exchange: 'binance',
					name: element.symbol,
					type: 'future',
					mark: JSON.parse(element.markPrice),
					index: JSON.parse(element.indexPrice),
					expiry: new Date(maybe_date).toString(),
					funding_rate: null,
				} as exchangeFutureDataT)
			} else {
				result.push({
					exchange: 'binance',
					name: element.symbol,
					type: 'perpetual',
					mark: JSON.parse(element.markPrice),
					index: JSON.parse(element.indexPrice),
					expiry: undefined,
					funding_rate: JSON.parse(element.lastFundingRate),
				})
			}
			return result;
		}, []);
	return dated_markets.concat(perp_markets);
}

