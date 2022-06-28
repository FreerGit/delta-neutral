import { writable } from 'svelte/store';
import type { futureType, settings } from 'src/app';
import { browser } from '$app/env';
import { onMount } from 'svelte';


const local_settings = browser && localStorage.getItem('settings');

export const global_settings = writable(
  browser && local_settings ? JSON.parse(local_settings) : {
    type: 'future' as futureType,
    exchanges: { binance: true, bybit: true, ftx: true },
    refresh_rate: 10
  } as settings
)
if (browser) {
  global_settings.subscribe((val) => {
    localStorage.settings = JSON.stringify(val)
  }
  )
}

