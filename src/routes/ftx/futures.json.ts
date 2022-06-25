import type { FuturesMarket } from "src/app";

export async function get() {
  let resp = await fetch('https://ftx.com/api/futures');
  const json = await resp.json();
  // return await resp.json();
  if (json.success) {
    const perp_and_dated: FuturesMarket[] =
      json.result.filter((fut: FuturesMarket) => fut.type == "perpetual" || fut.type == "future");
    return { body: perp_and_dated }
  }
  return Response.error();
}