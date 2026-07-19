export interface Asset{
    id: number
    symbol: string
    cardMarket: number
    purchasePrice: number
    currentPrice: number
    profit: number
    quantity: number
}

export interface PortfolioSummary {
    totalValue: number
    totalInvested: number
    totalProfit: number
}