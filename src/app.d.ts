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
	expiry: null | string;
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
	Future = "future",
	Spot = "spot",
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
	quoteCurrency: string;
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
	future: FuturesMarket,
	spot: spotMarket
}