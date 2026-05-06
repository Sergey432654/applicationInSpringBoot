import type { Asset } from '../../type/Asset.ts';

type CryptoAsset = Asset &
    Partial<{
        name: string;
        fullName: string;
        price: number;
        priceUsd: number;
        currentPrice: number;
        marketPrice: number;
        change24h: number;
        changePercent24h: number;
        percentChange24h: number;
        percentageChange24h: number;
        quantity: number;
    }>;

type CardProps = {
    asset: Asset;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

function firstNumber(...values: Array<number | undefined>): number | null {
    const value = values.find((item) => typeof item === 'number' && Number.isFinite(item));

    return value ?? null;
}

function Card({ asset }: CardProps) {
    const cryptoAsset = asset as CryptoAsset;

    const symbol = cryptoAsset.symbol?.toUpperCase() || 'UNKNOWN';
    const name = cryptoAsset.fullName || cryptoAsset.name || 'Crypto Asset';

    const price = firstNumber(
        cryptoAsset.price,
        cryptoAsset.priceUsd,
        cryptoAsset.currentPrice,
        cryptoAsset.marketPrice,
    );

    const changePercent = firstNumber(
        cryptoAsset.changePercent24h,
        cryptoAsset.percentChange24h,
        cryptoAsset.percentageChange24h,
        cryptoAsset.change24h,
    );

    const isPositive = changePercent !== null && changePercent > 0;
    const isNegative = changePercent !== null && changePercent < 0;

    const changeClassName = isPositive
        ? 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20'
        : isNegative
            ? 'bg-red-400/10 text-red-300 ring-red-400/20'
            : 'bg-slate-400/10 text-slate-300 ring-slate-400/20';

    const changePrefix = isPositive ? '+' : '';

    return (
        <article className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.06]">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-indigo-400 text-sm font-black text-slate-950 shadow-lg shadow-cyan-400/10">
                        {symbol.slice(0, 3)}
                    </div>

                    <div>
                        <h3 className="text-lg font-bold tracking-tight text-white">
                            {symbol}
                        </h3>
                        <p className="text-sm text-slate-400">
                            {name}
                        </p>
                    </div>
                </div>

                <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${changeClassName}`}>
          {changePercent === null
              ? '—'
              : `${changePrefix}${percentFormatter.format(changePercent)}%`}
        </span>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-sm font-medium text-slate-400">
                        Current price
                    </p>

                    <p className="mt-1 text-3xl font-black tracking-tight text-white">
                        {price === null ? '—' : currencyFormatter.format(price)}
                    </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-sm text-slate-400">
            24h change
          </span>

                    <span className={`text-sm font-bold ${isPositive ? 'text-emerald-300' : isNegative ? 'text-red-300' : 'text-slate-300'}`}>
            {changePercent === null
                ? 'No data'
                : `${changePrefix}${percentFormatter.format(changePercent)}%`}
          </span>
                </div>

                {typeof cryptoAsset.quantity === 'number' && Number.isFinite(cryptoAsset.quantity) && (
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-sm text-slate-400">
              Quantity
            </span>

                        <span className="text-sm font-semibold text-white">
              {cryptoAsset.quantity}
            </span>
                    </div>
                )}
            </div>
        </article>
    );
}

export default Card;