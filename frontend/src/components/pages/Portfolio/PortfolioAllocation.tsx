import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { Asset } from '../../../type/Asset.ts';

const COLORS = ['#3987e5', '#008300', '#d55181', '#c98500', '#199e70', '#d95926', '#9085e9', '#e66767'];

type AllocationSlice = { name: string; value: number };

function buildAllocation(assets: Asset[]): AllocationSlice[] {
    const withValue = assets
        .map((asset) => ({
            name: asset.symbol?.toUpperCase() ?? 'UNKNOWN',
            value: asset.quantity * (asset.currentPrice ?? 0),
        }))
        .filter((slice) => slice.value > 0)
        .sort((a, b) => b.value - a.value);

    if (withValue.length <= COLORS.length) return withValue;

    const head = withValue.slice(0, COLORS.length - 1);
    const otherValue = withValue.slice(COLORS.length - 1).reduce((sum, slice) => sum + slice.value, 0);
    return [...head, { name: 'Other', value: otherValue }];
}

type Props = {
    assets: Asset[];
};

function PortfolioAllocation({ assets }: Props) {
    const data = buildAllocation(assets);
    const total = data.reduce((sum, slice) => sum + slice.value, 0);

    if (data.length === 0 || total <= 0) {
        return null;
    }

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="mb-4 text-lg font-bold text-white">Allocation</h3>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius="55%"
                            outerRadius="80%"
                            paddingAngle={2}
                            stroke="#020617"
                            strokeWidth={2}
                            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                        >
                            {data.map((slice, index) => (
                                <Cell key={slice.name} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, name) => [`${(((value as number) / total) * 100).toFixed(1)}%`, name]}
                            contentStyle={{
                                background: '#0f172a',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 12,
                                color: '#fff',
                            }}
                        />
                        <Legend wrapperStyle={{ color: '#cbd5e1', fontSize: 13 }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default PortfolioAllocation;
