package com.example.demo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.persistence.*;

@Entity
@Table(name = "asset")

public class CryptoAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @NotBlank(message = "Symbol cant by empty")
    private String symbol;

    @Positive(message = "Quantity must be > 0")
    private Double quantity;

    @Positive(message = "Quantity must be > 0")
    private Double purchasePrice;

    @Positive
    private Double marketCap;

    @Transient
    private Double currentPrice;


    public CryptoAsset() {
    }



    public Double getProfit(){
        if (this.getCurrentPrice() == null || this.getPurchasePrice() == null) {
            return 0.0;
        }
        return this.getQuantity() * this.getCurrentPrice() - this.getPurchasePrice() * this.getQuantity();
    }
    public Double getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(Double currentPrice) { this.currentPrice = currentPrice; }
    public String getSymbol(){
        return symbol;
    }
    public void setSymbol(String symbol){
        this.symbol = symbol;
    }
    public Double getmarketCap(){return marketCap;}
    public void setmarketCap(Double marketCap){this.marketCap = marketCap;}
    public Long getId(){
        return id;
    }
    public Double getQuantity(){
        return quantity ;
    }
    public void setQuantity(Double quantity){
        this.quantity = quantity;
    }
    public Double getPurchasePrice(){
        return purchasePrice;
    }
    public void setPurchasePrice(Double purchasePrice){
        this.purchasePrice = purchasePrice;
    }
    
    
}
