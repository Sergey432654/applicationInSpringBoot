package com.example.demo;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class BinanceApi {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public BinanceApi(){
        this.objectMapper = new ObjectMapper();
        this.restTemplate = new RestTemplate();
    }

    @Cacheable(value = "cryptoPrices", key = "#symbol")
    public Double getCryptoPrice(String symbol){
        try{
            String url = "https://api.binance.com/api/v3/ticker/price?symbol=" + symbol + "USDT" ;
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            System.out.println("DEBUG: Request to Binance: " + url);
            return Double.parseDouble(root.path("price").asText());

        }catch (Exception e ){
            System.out.println("The cryptocurrency" + symbol + "was not found on Binance");
            return null;
        }

    }
}

