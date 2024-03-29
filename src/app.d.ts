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

export type exchangeType = 'binance' | 'bybit';
export type futureType = 'perpetual' | 'future';

export interface exchangeFutureDataT {
	exchange: exchangeType;
	name: string;
	type: futureType;
	mark: number;
	index: number;
	expiry: string | undefined;
	funding_rate: number | null;
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
	mark: number;
	index: number;
	delta: number;
}

export type fundingFrequency = 'hourly' | '8 hours';

interface perpRowType {
	exchange: string;
	name: string;
	funding_rate: number;
	frequency: fundingFrequency;
	mark: number;
	index: number;
}

interface binanceSpotMarket {
	symbol: string;
	price: number;
}

interface binanceMarket {
	symbol: string;
	markPrice: string;
	indexPrice: string;
	estimatedSettlePrice: string;
	lastFundingRate: string;
	interestRate: string;
	nextFundingTime: number;
	time: number;
}

export interface bybitResp {
	result: bybitmarket[];
}

export interface bybitMarket {
	symbol: string;
	mark_price: string;
	index_price: string;
	funding_rate: string;
	next_funding_time: string;
	delivery_time: string;
}

interface settings {
	refresh_rate: number;
	exchanges: {
		binance: boolean;
		bybit: boolean;
	};
}

interface marketBundle {
	futures: exchangeFutureDataT[];
}
