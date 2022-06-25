import type { spotMarket } from "src/app";

export async function get() {
  let resp = await fetch('https://ftx.com/api/markets');
  const json = await resp.json();
  // return await resp.json();
  if (json.success) {
    const spot_markets = json.result.filter(
      (spot: spotMarket) => spot.type == "spot" && spot.quoteCurrency == "USD" && !spot.tokenizedEquity);
    console.log(spot_markets.length)
    return { body: spot_markets }
  }
  return Response.error();
}
