package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepository extends JpaRepository<CryptoAsset, Long> {

}
