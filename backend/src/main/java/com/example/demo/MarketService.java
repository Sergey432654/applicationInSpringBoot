package com.example.demo;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

@Service
public class MarketService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public MarketService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    @Cacheable("marketCoins")
    public List<MarketCoin> getTopMarkets() {
        List<MarketCoin> coins = new ArrayList<>();
        try {
            String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1";
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);

            for (JsonNode node : root) {
                coins.add(new MarketCoin(
                        node.path("symbol").asText().toUpperCase(),
                        node.path("name").asText(),
                        node.path("image").asText(),
                        node.path("current_price").asDouble(),
                        node.path("price_change_percentage_24h").asDouble(),
                        node.path("market_cap").asDouble()
                ));
            }
        } catch (Exception e) {
            System.out.println("Failed to fetch market data: " + e.getMessage());
        }
        return coins;
    }
}
