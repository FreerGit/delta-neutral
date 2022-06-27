import type {
	exchangeFutureDataT,
	fundingRate,
	ftxFuturesMarket
} from 'src/app';

export async function get_ftx_futs() {
	const futures = fetch('https://ftx.com/api/futures');
	const rates = fetch('https://ftx.com/api/funding_rates');
	const [f_resp, r_resp] = await Promise.all([futures, rates]);
	const f_json = await f_resp.json();
	const r_json = await r_resp.json();

	if (f_json.success && r_json.success) {
		const perp_and_dated: exchangeFutureDataT[] = f_json.result.reduce(
			(result: exchangeFutureDataT[], fut: ftxFuturesMarket) => {
				if (fut.type == 'perpetual' || fut.type == 'future') {
					const obj: exchangeFutureDataT = {
						exchange: 'ftx',
						name: fut.name,
						type: fut.type,
						mark: fut.mark,
						index: fut.index,
						expiry: fut.expiry,
						funding_rate: null
					};
					if (fut.type == 'perpetual') {
						const maybe_rate = r_json.result.find((rate: fundingRate) => {
							return rate.future == fut.name;
						});
						if (maybe_rate !== undefined) {
							obj.funding_rate = maybe_rate.rate;
							result.push(obj);
						}
					} else {
						result.push(obj);
					}
				}
				return result;
			},
			[]
		);
		return perp_and_dated;
	}
}
