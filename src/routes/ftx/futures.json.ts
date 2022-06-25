import type { exchangeFutureDataT, FuturesMarket } from 'src/app';

export async function get() {
	const resp = await fetch('https://ftx.com/api/futures');
	const json = await resp.json();
	// return await resp.json();
	if (json.success) {
		const perp_and_dated: exchangeFutureDataT[] = json.result.reduce(
			(result: exchangeFutureDataT[], fut: FuturesMarket) => {
				if (fut.type == 'perpetual' || fut.type == 'future') {
					result.push({
						exchange: 'ftx',
						name: fut.name,
						type: fut.type,
						price: fut.mark,
						expiry: fut.expiry,
						underlying: fut.underlying
					});
				}
				return result;
			},
			[]
		);
		return { body: perp_and_dated };
	}
	return Response.error();
}
