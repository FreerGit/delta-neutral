# Δ Neutral strategies

Simple UI to detect basis trades and oppurtunities to collect funding.

## How to use

lorum

## How to build and run

ipsum

## TODO

- [ ] Dockerize
- [ ] "How to use"
- [ ] "How to build and run"
- [ ] Automated/easy way to push deployments to prod, want to learn this, terraform??
- [ ] Settings
  - [ ] Size of list
  - [ ] Refresh rate
  - [ ] auto refresh on/off
  - [ ] exchange list
  - [ ] show all the same pair from all exchanges or best one
  - [ ] persist storage between page visits (sessionStorage or smth)
- [ ] bybit
- [ ] deribit?
- [ ] phemex?

## EOD thoughts, do l8r

begin on settings and save it to sessionStorage.  
by default all exchanges would be turned on ["ftx","binance"...]  
send all those with the get request onMount  
proxy fetches and bundles -> respondes with the templated data type  
simply render data as normal but switch for logo etc.  
should probably move refresh rate slider(range) to settings page and have checkbox for on/off outisde settings modal

## Decisions on UI

DaisyUI - halloween theme
table -> "Table with visual elements"
range -> "primary color" (for refresh rate)
checkbox -> "primary color" (to choose boolean, exchanges etc)
toggle -> w/e (refresh or no)
tooltip -> "hover" to explain all concepts etc

on futures with spot:
Basis: picture of exchange, name, expiry, apy, fut price, spot price, delta, trade_setup(hover)

on perp with spot:
Funding: picture of exchange, name, apy, perp price, spot price, delta, trade_setup(hover)
