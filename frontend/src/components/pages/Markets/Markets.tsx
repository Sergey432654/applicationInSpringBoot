import { useQuery } from '@tanstack/react-query';
import type { MarketCoin } from '../../../type/Market.ts';
import { fetchMarkets } from '../../../api/Api.ts';
import Header from '../../Header/Header.tsx';
import MarketCard from '../../Card/MarketCard.tsx';

function Markets() {
    const {
        data: coins = [],
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useQuery<MarketCoin[], Error>({
        queryKey: ['markets'],
        queryFn: fetchMarkets,
    });

    const hasCoins = coins.length > 0;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Header isFetching={isFetching} onRefresh={() => void refetch()} />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <section className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/15 via-slate-900 to-indigo-500/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                            Markets
                        </p>

                        <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                            Top cryptocurrencies right now
                        </h1>

                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                            Live prices and market caps for the largest coins by market cap,
                            independent of what's in your portfolio.
                        </p>
                    </div>
                </section>

                <section aria-labelledby="markets-heading">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 id="markets-heading" className="text-2xl font-bold tracking-tight text-white">
                                Top coins
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Ranked by market cap.
                            </p>
                        </div>

                        {!isLoading && !isError && (
                            <p className="text-sm text-slate-400">
                                {coins.length} {coins.length === 1 ? 'coin' : 'coins'} loaded
                            </p>
                        )}
                    </div>

                    {isLoading && (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-44 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                                >
                                    <div className="mb-6 h-5 w-24 rounded-full bg-white/10" />
                                    <div className="mb-3 h-8 w-40 rounded-full bg-white/10" />
                                    <div className="h-4 w-32 rounded-full bg-white/10" />
                                </div>
                            ))}
                        </div>
                    )}

                    {isError && (
                        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-red-100">
                                        Failed to load markets
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-red-200/80">
                                        {error?.message || 'Something went wrong while fetching market data.'}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => void refetch()}
                                    className="rounded-full bg-red-400 px-5 py-2 text-sm font-bold text-red-950 transition hover:bg-red-300"
                                >
                                    Try again
                                </button>
                            </div>
                        </div>
                    )}

                    {!isLoading && !isError && hasCoins && (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {coins.map((coin) => (
                                <MarketCard key={coin.symbol} coin={coin} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Markets;
