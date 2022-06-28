# Δ Neutral strategies

Simple UI to detect basis trades and oppurtunities to collect funding.

## How to build and run

Either run with docker or locally:

### Docker
While being in the root directory (delta-neutral)
```
docker build . -t <name>
docker run -p 3000:3000 -d <name>
```
A docker daemon is now running, hit localhost:3000 in you browser.

### Without docker
simply run:
```
npm i
npm run build
npm run preview
```
## TODO

- [X] Dockerize
- [X] "How to use"
- [X] "How to build and run"
- [ ] Automated/easy way to push deployments to prod, want to learn this, terraform??
- [ ] Settings
  - [ ] Size of list
  - [x] Refresh rate
  - [ ] auto refresh on/off
  - [x] exchange list
  - [ ] show all the same pair from all exchanges or best one
  - [x] persist storage between page visits (sessionStorage or smth)
- [ ] deribit?
- [ ] phemex?
- [ ] speed up, use flamegraph
