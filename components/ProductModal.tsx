'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { type CartItem } from './CartModal';

type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
  colors: string[];
  description: string;
  sizes: string[];
  details: string;
};

type ProductModalProps = {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
};

export default function ProductModal({
  product,
  onClose,
  onAddToCart
}: ProductModalProps) {
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
      color: selectedColor
    });

    alert(`${product.name} - ${selectedSize} 사이즈가 장바구니에 추가되었습니다!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-zinc-900">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-8 p-8 md:grid-cols-2">
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-xl bg-zinc-800">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-3xl">{product.name}</h2>
              <p className="text-2xl">{product.price}</p>
            </div>

            <p className="text-sm leading-relaxed opacity-80">
              {product.description}
            </p>

            <div className="space-y-3">
              <label className="text-sm opacity-80">컬러 선택</label>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`h-10 w-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'scale-110 border-white'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm opacity-80">사이즈 선택</label>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border py-3 transition-all ${
                      selectedSize === size
                        ? 'border-white bg-white text-black'
                        : 'border-white/20 bg-transparent hover:border-white/60'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4">
              <h3 className="text-sm opacity-80">제품 상세</h3>
              <p className="text-xs leading-relaxed opacity-70">
                {product.details}
              </p>
            </div>

            <div className="space-y-2 text-xs opacity-60">
              <p>• 프리미엄 코튼 100% 소재</p>
              <p>• 30도 물 세탁 권장</p>
              <p>• 한국에서 제작</p>
              <p>• 무료 배송 (50,000원 이상 구매 시)</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={handlePurchase}
                className="rounded-full bg-blue-600 py-4 transition-colors hover:bg-blue-700"
              >
                장바구니 추가
              </button>
              <button
                onClick={handlePurchase}
                className="rounded-full bg-white py-4 text-black transition-colors hover:bg-gray-200"
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
