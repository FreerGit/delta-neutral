import type { exchangeFutureDataT, fundingRate, FuturesMarket } from 'src/app';

function bundle_perps_with_rates(futures: FuturesMarket[], rates: fundingRate[]) {

}

export async function get() {
  const futures = fetch('https://ftx.com/api/futures');
  const rates = fetch('https://ftx.com/api/funding_rates');
  const [f_resp, r_resp] = await Promise.all([futures, rates]);
  const f_json = await f_resp.json();
  const r_json = await r_resp.json();

  if (f_json.success && r_json.success) {
    const perp_and_dated: exchangeFutureDataT[] = f_json.result.reduce(
      (result: exchangeFutureDataT[], fut: FuturesMarket) => {
        if (fut.type == 'perpetual' || fut.type == 'future') {
          let obj: exchangeFutureDataT =
          {
            exchange: 'ftx',
            name: fut.name,
            type: fut.type,
            price: fut.mark,
            expiry: fut.expiry,
            underlying: fut.underlying,
            funding_rate: null,
          };
          if (fut.type == "perpetual") {
            const maybe_rate = r_json.result.find((rate: fundingRate) => { return rate.future == fut.name });
            if (maybe_rate !== undefined) {
              obj.funding_rate = maybe_rate.rate
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
    return { body: perp_and_dated };
  }
  return Response.error();
}
