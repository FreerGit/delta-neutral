/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

export type FuturesCoinType = 'perpetual' | 'future' | 'prediction' | 'move';
export type FuturesCoinGroup = 'perpetual' | 'quarterly' | 'prediction';

export interface FuturesCoin {
	name: string;
	underlying: string;
	description: string;
	type: FuturesCoinType;
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
	group: FuturesCoinGroup;
	change1h: number;
	change24h: number;
	changeBod: number;
	volumeUsd24h: number;
	volume: number;
	openInterest: number;
	openInterestUsd: number;
}