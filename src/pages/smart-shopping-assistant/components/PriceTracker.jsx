import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const PriceTracker = ({ onSetAlert }) => {
  const [selectedIngredient, setSelectedIngredient] = useState('bawang-merah');
  const [alertPrice, setAlertPrice] = useState('');

  const ingredients = [
    {
      id: 'bawang-merah',
      name: 'Bawang Merah',
      currentPrice: 32000,
      unit: 'per kg',
      change: -8.5,
      category: 'Bumbu Dasar',
      availability: 'Tersedia',
      season: 'Musim Panen'
    },
    {
      id: 'cabai-merah',
      name: 'Cabai Merah',
      currentPrice: 45000,
      unit: 'per kg',
      change: 12.3,
      category: 'Bumbu Dasar',
      availability: 'Terbatas',
      season: 'Off Season'
    },
    {
      id: 'daging-sapi',
      name: 'Daging Sapi',
      currentPrice: 120000,
      unit: 'per kg',
      change: 5.2,
      category: 'Protein',
      availability: 'Tersedia',
      season: 'Stabil'
    },
    {
      id: 'ayam-kampung',
      name: 'Ayam Kampung',
      currentPrice: 85000,
      unit: 'per kg',
      change: -3.1,
      category: 'Protein',
      availability: 'Tersedia',
      season: 'Stabil'
    }
  ];

  const priceHistory = {
    'bawang-merah': [
      { date: '1 Sep', price: 35000, volume: 120 },
      { date: '8 Sep', price: 38000, volume: 95 },
      { date: '15 Sep', price: 34000, volume: 110 },
      { date: '22 Sep', price: 32000, volume: 130 },
      { date: '29 Sep', price: 32000, volume: 125 }
    ],
    'cabai-merah': [
      { date: '1 Sep', price: 40000, volume: 80 },
      { date: '8 Sep', price: 42000, volume: 75 },
      { date: '15 Sep', price: 44000, volume: 65 },
      { date: '22 Sep', price: 46000, volume: 60 },
      { date: '29 Sep', price: 45000, volume: 70 }
    ],
    'daging-sapi': [
      { date: '1 Sep', price: 115000, volume: 45 },
      { date: '8 Sep', price: 118000, volume: 42 },
      { date: '15 Sep', price: 120000, volume: 40 },
      { date: '22 Sep', price: 122000, volume: 38 },
      { date: '29 Sep', price: 120000, volume: 43 }
    ],
    'ayam-kampung': [
      { date: '1 Sep', price: 88000, volume: 65 },
      { date: '8 Sep', price: 86000, volume: 70 },
      { date: '15 Sep', price: 84000, volume: 75 },
      { date: '22 Sep', price: 85000, volume: 68 },
      { date: '29 Sep', price: 85000, volume: 72 }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const selectedIngredientData = ingredients?.find(ing => ing?.id === selectedIngredient);
  const chartData = priceHistory?.[selectedIngredient] || [];

  const getChangeColor = (change) => {
    if (change > 0) return 'text-destructive';
    if (change < 0) return 'text-success';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Tersedia': return 'text-success';
      case 'Terbatas': return 'text-warning';
      case 'Habis': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const handleSetAlert = () => {
    if (alertPrice && selectedIngredientData) {
      onSetAlert({
        ingredientId: selectedIngredient,
        ingredientName: selectedIngredientData?.name,
        targetPrice: parseFloat(alertPrice),
        currentPrice: selectedIngredientData?.currentPrice
      });
      setAlertPrice('');
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-cultural">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="TrendingUp" size={20} className="text-warning" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">Pelacak Harga</h3>
          <p className="text-sm text-muted-foreground">Monitor harga bahan makanan favorit</p>
        </div>
      </div>
      {/* Ingredient Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Pilih Bahan</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ingredients?.map((ingredient) => (
            <button
              key={ingredient?.id}
              onClick={() => setSelectedIngredient(ingredient?.id)}
              className={`p-4 rounded-lg text-left transition-all duration-200 ${
                selectedIngredient === ingredient?.id
                  ? 'bg-primary text-primary-foreground shadow-cultural'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">{ingredient?.name}</h5>
                <div className={`flex items-center space-x-1 ${
                  selectedIngredient === ingredient?.id ? 'text-primary-foreground' : getChangeColor(ingredient?.change)
                }`}>
                  <Icon name={getChangeIcon(ingredient?.change)} size={14} />
                  <span className="text-sm font-medium">{Math.abs(ingredient?.change)}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={selectedIngredient === ingredient?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}>
                  {formatCurrency(ingredient?.currentPrice)} {ingredient?.unit}
                </span>
                <span className={`${
                  selectedIngredient === ingredient?.id ? 'text-primary-foreground' : getAvailabilityColor(ingredient?.availability)
                }`}>
                  {ingredient?.availability}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Selected Ingredient Details */}
      {selectedIngredientData && (
        <div className="mb-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-lg text-foreground">{selectedIngredientData?.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedIngredientData?.category} • {selectedIngredientData?.season}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-xl text-foreground">
                  {formatCurrency(selectedIngredientData?.currentPrice)}
                </p>
                <p className="text-sm text-muted-foreground">{selectedIngredientData?.unit}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Perubahan 7 Hari</p>
                <div className={`flex items-center justify-center space-x-1 ${getChangeColor(selectedIngredientData?.change)}`}>
                  <Icon name={getChangeIcon(selectedIngredientData?.change)} size={14} />
                  <span className="font-medium">{Math.abs(selectedIngredientData?.change)}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ketersediaan</p>
                <p className={`font-medium ${getAvailabilityColor(selectedIngredientData?.availability)}`}>
                  {selectedIngredientData?.availability}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status Musim</p>
                <p className="font-medium text-foreground">{selectedIngredientData?.season}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Price Chart */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Grafik Harga (30 Hari Terakhir)</h4>
        <div className="bg-muted/30 rounded-lg p-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `${value/1000}k`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Harga']}
                labelStyle={{ color: 'var(--color-foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'var(--color-accent)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Volume Chart */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Volume Penjualan</h4>
        <div className="bg-muted/30 rounded-lg p-4">
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value) => [value, 'Volume (ton)']}
                labelStyle={{ color: 'var(--color-foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="volume" 
                fill="var(--color-secondary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Price Alert */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Set Alert Harga</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Dapatkan notifikasi ketika harga {selectedIngredientData?.name} mencapai target Anda
        </p>
        <div className="flex space-x-3">
          <div className="flex-1">
            <input
              type="number"
              placeholder={`Contoh: ${selectedIngredientData?.currentPrice - 5000}`}
              value={alertPrice}
              onChange={(e) => setAlertPrice(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button
            variant="default"
            iconName="Bell"
            iconPosition="left"
            onClick={handleSetAlert}
            disabled={!alertPrice}
          >
            Set Alert
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Harga saat ini: {formatCurrency(selectedIngredientData?.currentPrice || 0)}
        </p>
      </div>
    </div>
  );
};

export default PriceTracker;