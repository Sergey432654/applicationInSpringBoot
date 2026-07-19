package com.example.demo;

import jakarta.validation.Valid;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SpringBootApplication
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DemoApplication {

	private final AssetService assetService;

	public DemoApplication(AssetService assetService) {
		this.assetService = assetService;
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@GetMapping("/assets")
	public List<CryptoAsset> getAll() {
		return assetService.getAllAssets();
	}
	@GetMapping("/portfolio-data")
	public List<CryptoAsset> getPortfolioData() {
		return assetService.getAllAssets();
	}
	@DeleteMapping("/assets/{id}")
	public void deleteAsset(@PathVariable Long id) {
		assetService.deleteAsset(id);
	}
	@PostMapping("/assets")
	public void addAsset (@Valid @RequestBody CryptoAsset asset) {
		assetService.addAsset(asset.getSymbol(), asset.getQuantity(), asset.getPurchasePrice());
	}
}