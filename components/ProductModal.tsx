import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CartItem } from './CartModal';

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  colors: string[];
  description: string;
  sizes: string[];
  details: string;
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePurchase = () => {
    if (!selectedSize) {
      alert('사이즈를 선택해주세요.');
      return;
    }
    
    onAddToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
    });
    
    alert(`${product.name} - ${selectedSize} 사이즈가 장바구니에 추가되었습니다!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-zinc-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden bg-zinc-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl mb-2">{product.name}</h2>
              <p className="text-2xl">{product.price}</p>
            </div>

            <p className="text-sm opacity-80 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="text-sm opacity-80">컬러 선택</label>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-white scale-110'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="text-sm opacity-80">사이즈 선택</label>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent border-white/20 hover:border-white/60'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <h3 className="text-sm opacity-80">제품 상세</h3>
              <p className="text-xs opacity-70 leading-relaxed">
                {product.details}
              </p>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 text-xs opacity-60">
              <p>• 프리미엄 코튼 100% 소재</p>
              <p>• 30도 물 세탁 권장</p>
              <p>• 한국에서 제작</p>
              <p>• 무료 배송 (50,000원 이상 구매 시)</p>
            </div>

            {/* Purchase Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={handlePurchase}
                className="py-4 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
              >
                장바구니 추가
              </button>
              <button
                onClick={handlePurchase}
                className="py-4 bg-white text-black hover:bg-gray-200 rounded-full transition-colors"
              >
                바로 구매
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}