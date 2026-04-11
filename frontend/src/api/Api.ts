
export const fetchAssets = async () => {
    const response = await fetch('http://localhost:8080/api/assets');
    if (!response.ok) throw new Error('Network error');
    return await response.json();
};