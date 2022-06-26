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
- [x] draw UI skeleton
- [x] simple css work for UI outline
- [ ] picture per exchange
- [x] calculate basis trade
  - [x] info button with explanation (what to short, what to long etc)
- [ ] Picture per exchange
- [ ] Template for future/perp data (general for diff exchanges)
- [ ] Settings
  - [ ] Size of list
  - [ ] Refresh rate
  - [ ] auto refresh on/off
  - [ ] exchange list
  - [ ] show all the same pair from all exchanges or best one
- [ ] top 25 default
- [x] ftx
- [ ] binance
- [ ] bybit
- [ ] phemex?

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
