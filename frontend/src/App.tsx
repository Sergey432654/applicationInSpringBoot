import './App.css';

import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from './api/Api.ts';
import type { Asset } from './type/Asset.ts';
import Card from './components/Card/Card.tsx';

function App() {
  const {
    data: assets = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<Asset[], Error>({
    queryKey: ['assets'],
    queryFn: fetchAssets,
  });

  const hasAssets = assets.length > 0;

  return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center gap-3" aria-label="Crypto Dashboard Home">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400 text-lg font-black text-slate-950 shadow-lg shadow-cyan-400/20">
                ₿
              </div>

              <div>
                <p className="text-base font-bold tracking-tight text-white sm:text-lg">
                  CryptoBoard
                </p>
                <p className="text-xs text-slate-400">
                  Real-time asset overview
                </p>
              </div>
            </a>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
              <a href="#assets" className="transition hover:text-white">
                Assets
              </a>
              <a href="#portfolio" className="transition hover:text-white">
                Portfolio
              </a>
              <a href="#markets" className="transition hover:text-white">
                Markets
              </a>
            </nav>

            <button
                type="button"
                onClick={() => void refetch()}
                disabled={isFetching}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isFetching ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <section className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/15 via-slate-900 to-indigo-500/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Dashboard
              </p>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                Track your crypto assets with confidence
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                Monitor prices, daily movements, and portfolio assets in a clean,
                responsive interface.
              </p>
            </div>
          </section>

          <section id="assets" aria-labelledby="assets-heading">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="assets-heading" className="text-2xl font-bold tracking-tight text-white">
                  Assets
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Live overview of available crypto assets.
                </p>
              </div>

              {!isLoading && !isError && (
                  <p className="text-sm text-slate-400">
                    {assets.length} {assets.length === 1 ? 'asset' : 'assets'} loaded
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
                        Failed to load assets
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-red-200/80">
                        {error?.message || 'Something went wrong while fetching crypto assets.'}
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

            {!isLoading && !isError && !hasAssets && (
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                    ◎
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    No assets yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                    Your API returned an empty asset list. Add assets from the backend
                    or connect a market data provider to populate this dashboard.
                  </p>
                </div>
            )}

            {!isLoading && !isError && hasAssets && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {assets.map((asset) => (
                      <Card key={asset.id} asset={asset} />
                  ))}
                </div>
            )}
          </section>
        </main>
      </div>
  );
}

export default App;