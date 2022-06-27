import type { bybitMarket, bybitResp, exchangeFutureDataT } from "src/app";

export async function get_bybit_futs() {
  const futs_resp = await fetch('https://api.bybit.com/v2/public/tickers');
  const f_json: bybitResp = await futs_resp.json() as bybitResp;
  const markets: exchangeFutureDataT[] =
    f_json.result.reduce((result: exchangeFutureDataT[], element: bybitMarket) => {
      if (element.delivery_time !== "") {
        result.push({
          exchange: 'bybit',
          name: element.symbol,
          type: 'future',
          mark: JSON.parse(element.mark_price),
          index: JSON.parse(element.index_price),
          expiry: element.delivery_time,
          funding_rate: null,
        } as exchangeFutureDataT)
      } else if (element.next_funding_time !== "") {
        result.push({
          exchange: 'bybit',
          name: element.symbol,
          type: 'perpetual',
          mark: JSON.parse(element.mark_price),
          index: JSON.parse(element.index_price),
          expiry: undefined,
          funding_rate: JSON.parse(element.funding_rate)
        } as exchangeFutureDataT)
      }
      return result
    }, [])

  return markets;
}

