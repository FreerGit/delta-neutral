/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

export type FuturesMarketType = 'perpetual' | 'future' | 'prediction' | 'move';
export type FuturesMarketGroup = 'perpetual' | 'quarterly' | 'prediction';

export interface FuturesMarket {
	name: string;
	underlying: string;
	description: string;
	type: FuturesMarketType;
	expiry: undefined | string;
	perpetual: boolean;
	expired: false;
	enabled: true;
	postOnly: false;
	priceIncrement: number;
	sizeIncrement: number;
	last: number;
	bid: number;
	ask: number;
	index: number;
	mark: number;
	imfFactor: number;
	lowerBound: number;
	upperBound: number;
	underlyingDescription: string;
	expiryDescription: string;
	moveStart: null;
	marginPrice: number;
	positionLimitWeight: number;
	group: FuturesMarketGroup;
	change1h: number;
	change24h: number;
	changeBod: number;
	volumeUsd24h: number;
	volume: number;
	openInterest: number;
	openInterestUsd: number;
}

export enum marketType {
	Future = 'future',
	Spot = 'spot'
}

export enum QuoteCurrency {
	Aud = 'AUD',
	Brz = 'BRZ',
	Btc = 'BTC',
	Doge = 'DOGE',
	Eur = 'EUR',
	Jpy = 'JPY',
	Tryb = 'TRYB',
	Usd = 'USD',
	Usdt = 'USDT'
}

export interface spotMarket {
	name: string;
	enabled: boolean;
	postOnly: boolean;
	priceIncrement: number;
	sizeIncrement: number;
	minProvideSize: number;
	last?: number;
	bid?: number;
	ask?: number;
	price?: number;
	type: marketType;
	futureType: string;
	baseCurrency: string;
	isEtfMarket: boolean;
	quoteCurrency?: QuoteCurrency;
	underlying: string;
	restricted: boolean;
	highLeverageFeeExempt: boolean;
	largeOrderThreshold: number;
	change1h: number;
	change24h: number;
	changeBod: number;
	quoteVolume24h: number;
	volumeUsd24h: number;
	priceHigh24h: number;
	priceLow24h: number;
	tokenizedEquity?: boolean;
}

export interface FutureWithSpot {
	future: exchangeFutureDataT;
	spot: exchangeSpotDataT;
}

export type exchangeType = 'ftx' | 'binance' | 'bybit';
export type futureType = 'perpetual' | 'future';

export interface exchangeFutureDataT {
	exchange: exchangeType;
	name: string;
	type: futureType;
	price: number;
	expiry: string | undefined;
	underlying: string;
	funding_rate: number | null;
}

export interface exchangeSpotDataT {
	exchange: exchangeType;
	name: string;
	price: number;
	underlying: string;
}

export interface fundingRate {
	future: string;
	rate: number;
	time: string;
}

interface datedFutureRowType {
	// row_type: string;
	exchange: string;
	name: string;
	expiry: string;
	apy: number;
	fut_price: number;
	spot_price: number;
	delta: number;
}

export type fundingFrequency = 'hourly' | '8 hours';

interface perpRowType {
	exchange: string;
	name: string;
	funding_rate: number;
	frequency: fundingFrequency;
	fut_price: number;
	spot_price: number;
}
