declare module 'crypto-browserify';

declare global {
    var Buffer: typeof import('buffer').Buffer;
    var crypto: typeof import('crypto-browserify');
}

