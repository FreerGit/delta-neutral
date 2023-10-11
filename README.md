# Δ Neutral strategies

Simple UI to detect basis trades and oppurtunities to collect funding.

## WATCH OUT
Since people have been forking/starring/using repository:
USE ARE YOUR OWN RISK, CAN BE BUGS, NOT FINANCIAL ADVISE ETC ETC. NO SUCH THING AS RISK FREE, DYOR.

Seriously, I made this with some spare time I had and the likelyhood there is some misscalculation is quite large, do a manual calculation before putting any trade on.

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

