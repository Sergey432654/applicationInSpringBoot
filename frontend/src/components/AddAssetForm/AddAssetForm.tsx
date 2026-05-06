import { useState } from 'react';
import { addAsset } from '../../api/Api.ts';

interface Props {
    onSuccess: () => void;
}

function AddAssetForm({ onSuccess }: Props) {
    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setIsLoading(true);
        setError('');
        try {
            await addAsset({
                symbol,
                quantity: Number(quantity),
                purchasePrice: Number(purchasePrice),
            });
            onSuccess();
            setSymbol('');
            setQuantity('');
            setPurchasePrice('');
        } catch (e) {
            setError('Failed to add asset');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="mb-4 text-lg font-bold text-white">Add Asset</h3>

            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Symbol (e.g. BTC)"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                />
                <input
                    type="number"
                    placeholder="Purchase Price"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                />

                {error && <p className="text-sm text-red-400">{error}</p>}

                <button
                    type="button"
                    onClick={() => void handleSubmit()}
                    disabled={isLoading}
                    className="rounded-full bg-cyan-400 px-5 py-2 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
                >
                    {isLoading ? 'Adding...' : 'Add Asset'}
                </button>
            </div>
        </div>
    );
}

export default AddAssetForm;