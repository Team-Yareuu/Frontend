import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetBreakdown = ({ budgetData, onShopNow }) => {
  const [selectedMarketplace, setSelectedMarketplace] = useState('tokopedia');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount)?.replace('IDR', 'Rp');
  };

  const getMarketplaceIcon = (marketplace) => {
    const icons = {
      tokopedia: 'ShoppingBag',
      shopee: 'ShoppingCart',
      blibli: 'Store',
      bukalapak: 'Package'
    };
    return icons?.[marketplace] || 'ShoppingBag';
  };

  const getBudgetColor = (percentage) => {
    if (percentage <= 50) return 'text-success bg-success/10';
    if (percentage <= 75) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-bold text-foreground flex items-center">
          <Icon name="Calculator" size={24} className="text-success mr-3" />
          Rincian Biaya
        </h3>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Total:</span>
          <span className="text-xl font-bold text-success">
            {formatCurrency(budgetData?.total)}
          </span>
        </div>
      </div>
      {/* Budget Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-success/5 rounded-lg p-4 text-center">
          <Icon name="TrendingDown" size={20} className="text-success mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Hemat</p>
          <p className="font-semibold text-success">{formatCurrency(budgetData?.savings)}</p>
        </div>
        
        <div className="bg-primary/5 rounded-lg p-4 text-center">
          <Icon name="Users" size={20} className="text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Per Porsi</p>
          <p className="font-semibold text-primary">{formatCurrency(budgetData?.perServing)}</p>
        </div>
        
        <div className="bg-accent/5 rounded-lg p-4 text-center">
          <Icon name="Percent" size={20} className="text-accent mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">vs Restoran</p>
          <p className="font-semibold text-accent">-{budgetData?.restaurantSavings}%</p>
        </div>
      </div>
      {/* Marketplace Selector */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-3">Pilih Marketplace</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {budgetData?.marketplaces?.map((marketplace) => (
            <button
              key={marketplace?.name}
              onClick={() => setSelectedMarketplace(marketplace?.name)}
              className={`p-3 rounded-lg border transition-all ${
                selectedMarketplace === marketplace?.name
                  ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                name={getMarketplaceIcon(marketplace?.name)} 
                size={20} 
                className="mx-auto mb-1" 
              />
              <p className="text-xs font-medium capitalize">{marketplace?.name}</p>
              <p className="text-xs">{formatCurrency(marketplace?.total)}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Ingredient Breakdown */}
      <div className="space-y-3 mb-6">
        <h4 className="font-semibold text-foreground">Rincian Bahan</h4>
        
        {budgetData?.ingredients?.map((ingredient, index) => {
          const selectedPrice = budgetData?.marketplaces?.find(m => m?.name === selectedMarketplace)?.ingredients?.[index]?.price || ingredient?.price;
          const budgetPercentage = (selectedPrice / budgetData?.total) * 100;
          
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Package" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{ingredient?.name}</p>
                    <p className="text-xs text-muted-foreground">{ingredient?.quantity}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{formatCurrency(selectedPrice)}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${getBudgetColor(budgetPercentage)}`}>
                  {budgetPercentage?.toFixed(0)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Shopping Actions */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          iconName="ShoppingCart"
          iconPosition="left"
          onClick={() => onShopNow(selectedMarketplace)}
        >
          Belanja Sekarang di {selectedMarketplace?.charAt(0)?.toUpperCase() + selectedMarketplace?.slice(1)}
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" iconName="List" iconPosition="left">
            Tambah ke Daftar
          </Button>
          <Button variant="outline" iconName="Compare" iconPosition="left">
            Bandingkan Harga
          </Button>
        </div>
      </div>
      {/* Budget Tips */}
      <div className="mt-6 p-4 bg-success/5 rounded-lg border border-success/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-success mt-0.5" />
          <div>
            <h5 className="font-semibold text-success mb-2">Tips Hemat</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Beli bahan dalam jumlah besar untuk resep lainnya</li>
              <li>• Gunakan aplikasi cashback untuk penghematan ekstra</li>
              <li>• Cek promo hari ini di marketplace pilihan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetBreakdown;
