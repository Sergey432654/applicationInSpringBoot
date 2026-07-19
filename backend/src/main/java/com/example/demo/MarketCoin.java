package com.example.demo;

public record MarketCoin(
        String symbol,
        String name,
        String image,
        Double currentPrice,
        Double priceChangePercentage24h,
        Double marketCap
) {
}
