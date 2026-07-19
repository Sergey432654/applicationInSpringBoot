import type { PortfolioSummary } from '../../../type/Asset.ts';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

type Props = {
    summary: PortfolioSummary;
};

function PortfolioStats({ summary }: Props) {
    const isPositive = summary.totalProfit > 0;
    const isNegative = summary.totalProfit < 0;
    const profitClassName = isPositive ? 'text-emerald-300' : isNegative ? 'text-red-300' : 'text-slate-300';

    return (
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-medium text-slate-400">Total value</p>
                <p className="mt-2 text-2xl font-black tracking-tight text-white">
                    {currencyFormatter.format(summary.totalValue)}
                </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-medium text-slate-400">Total invested</p>
                <p className="mt-2 text-2xl font-black tracking-tight text-white">
                    {currencyFormatter.format(summary.totalInvested)}
                </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-medium text-slate-400">Profit / Loss</p>
                <p className={`mt-2 text-2xl font-black tracking-tight ${profitClassName}`}>
                    {isPositive ? '+' : ''}{currencyFormatter.format(summary.totalProfit)}
                </p>
            </div>
        </div>
    );
}

export default PortfolioStats;
