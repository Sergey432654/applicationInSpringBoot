package com.example.demo;

import com.example.demo.AssetRepository;
import com.example.demo.CryptoAsset;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class AssetService {

    private final AssetRepository assetRepository;
    private final BinanceApi binanceApi; // Переконайся, що в BinanceApi методи називаються правильно (getPrice або getCryptoPrice)

    public AssetService(AssetRepository assetRepository, BinanceApi binanceApi) {
        this.assetRepository = assetRepository;
        this.binanceApi = binanceApi;
    }

    public List<CryptoAsset> getAllAssets() {
        List<CryptoAsset> assets = assetRepository.findAll();

        for (CryptoAsset asset : assets) {
            Double price = binanceApi.getCryptoPrice(asset.getSymbol());
            asset.setCurrentPrice(price);

            if (price == null) {
                System.out.println("The cryptocurrency" + asset.getSymbol() + " was not found on Binance");
            }
        }
        return assets;
    }

    public PortfolioSummary getPortfolioSummary(List<CryptoAsset> assets) {
        double totalValue = 0.0;
        double totalInvested = 0.0;
        for (CryptoAsset asset : assets) {
            totalInvested += asset.getQuantity() * asset.getPurchasePrice();
            if (asset.getCurrentPrice() != null) {
                totalValue += asset.getQuantity() * asset.getCurrentPrice();
            }
        }
        return new PortfolioSummary(totalValue, totalInvested, totalValue - totalInvested);
    }

    public void addAsset(String symbol, Double quantity, Double purchasePrice) {
        CryptoAsset asset = new CryptoAsset();
        asset.setSymbol(symbol.toUpperCase().trim());
        asset.setQuantity(quantity);
        asset.setPurchasePrice(purchasePrice);
        assetRepository.save(asset);
    }

    public void deleteAsset(Long id) {
        assetRepository.deleteById(id);
    }
}