import { get_binance_futs } from '$lib/ts/binance_futures';
import { get_ftx_futs } from '$lib/ts/ftx_futures';
import type { marketBundle } from 'src/app';

export async function get({ url }: URL) {
  const to_fetch = [];
  if (JSON.parse(url.searchParams.get('binance'))) {
    to_fetch.push(get_binance_futs());
  }
  if (JSON.parse(url.searchParams.get('ftx'))) {
    to_fetch.push(get_ftx_futs());
  }
  if (JSON.parse(url.searchParams.get('bybit'))) {
    // to_fetch.push(get_ftx_futs());
  }
  const res = await Promise.all(
    to_fetch
  );

  const exchange_bundle = {
    futures: res.flat(1)
  } as marketBundle;
  return { body: exchange_bundle };
}
