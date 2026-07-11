import { Link } from 'react-router-dom';

interface HeaderProps {
    isFetching: boolean;
    onRefresh: () => void;
}
export default function Header({isFetching, onRefresh}: HeaderProps) {
    return(
        <>
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
                        <Link to="/" className="transition hover:text-white">
                            Assets
                        </Link>
                        <Link to="/portfolio" className="transition hover:text-white">
                            Portfolio
                        </Link>
                        <Link to="/markets" className="transition hover:text-white">
                            Markets
                        </Link>
                    </nav>

                    <button
                        type="button"
                        onClick={() => void onRefresh()}
                        disabled={isFetching}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isFetching ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </header>

        </>
    )
}