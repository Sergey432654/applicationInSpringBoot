import type { MarketCoin } from '../../type/Market.ts';

type Props = {
    coin: MarketCoin;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

function MarketCard({ coin }: Props) {
    const isPositive = coin.priceChangePercentage24h > 0;
    const isNegative = coin.priceChangePercentage24h < 0;

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
                    <img
                        src={coin.image}
                        alt={coin.name}
                        className="h-12 w-12 rounded-2xl bg-white/10 object-contain p-1.5"
                    />

                    <div>
                        <h3 className="text-lg font-bold tracking-tight text-white">
                            {coin.symbol}
                        </h3>
                        <p className="text-sm text-slate-400">
                            {coin.name}
                        </p>
                    </div>
                </div>

                <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${changeClassName}`}>
          {`${changePrefix}${percentFormatter.format(coin.priceChangePercentage24h)}%`}
        </span>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-sm font-medium text-slate-400">
                        Price
                    </p>

                    <p className="mt-1 text-3xl font-black tracking-tight text-white">
                        {currencyFormatter.format(coin.currentPrice)}
                    </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-sm text-slate-400">
            Market cap
          </span>

                    <span className="text-sm font-semibold text-white">
            {compactCurrencyFormatter.format(coin.marketCap)}
          </span>
                </div>
            </div>
        </article>
    );
}

export default MarketCard;
