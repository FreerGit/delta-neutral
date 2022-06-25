import type { exchangeSpotDataT, spotMarket } from 'src/app';

function get_spot_price(market: spotMarket): number {
  let price;
  if (market.last) {
    price = market.last;
  } else if (market.price) {
    price = market.price;
  } else {
    throw 'price and last undefined';
  }
  return price;
}

export async function get() {
  const resp = await fetch('https://ftx.com/api/markets');
  const json = await resp.json();
  if (json.success) {
    const spot_markets: exchangeSpotDataT[] = json.result.reduce(
      (result: exchangeSpotDataT[], spot: spotMarket) => {
        if (
          spot.type == 'spot' &&
          spot.quoteCurrency == 'USD' &&
          !spot.tokenizedEquity
        ) {
          result.push({
            exchange: 'ftx',
            name: spot.name,
            price: get_spot_price(spot),
            underlying: spot.baseCurrency
          });
        }
        return result;
      },
      []
    );
    return { body: spot_markets };
  }
  return Response.error();
}
