
export const fetchAssets = async () => {
    const response = await fetch('http://localhost:8080/api/assets');
    if (!response.ok) throw new Error('Network error');
    return await response.json();
};
export const addAsset = async (asset: {symbol: string , quantity: number, purchasePrice: number}) => {
    const response = await fetch('http://localhost:8080/api/assets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(asset)
    });
    if(!response.ok) throw new Error('Network error');
}
export const deleteAssets = async (id: number) => {
    const response = await fetch(`http://localhost:8080/api/assets/${id}`, {
        method: 'DELETE'
    });
    if(!response.ok) throw new Error('Network error');
}
export const fetchPortfolioSummary = async () => {
    const response = await fetch('http://localhost:8080/api/portfolio/summary');
    if (!response.ok) throw new Error('Network error');
    return await response.json();
};
export const fetchMarkets = async () => {
    const response = await fetch('http://localhost:8080/api/markets');
    if (!response.ok) throw new Error('Network error');
    return await response.json();
};