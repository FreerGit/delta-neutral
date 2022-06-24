
export async function get() {
  let resp = await fetch('https://ftx.com/api/markets');
  const json = await resp.json();
  // return await resp.json();
  if (json.success) {
    let length = json.result.length;
    let spotMarkets = []
    for (let num = 0; num < length; num++) {
      if (json.result[num].type == "spot") {
        spotMarkets.push(json.result[num]);
      }
    }
    return { body: spotMarkets }
  }
  return Response.error();
}
