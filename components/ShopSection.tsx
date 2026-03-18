import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductModal } from './ProductModal';
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

interface ShopSectionProps {
  onAddToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
}

export function ShopSection({ onAddToCart }: ShopSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: 1,
      name: 'ZEUS Classic Black Tee',
      image: 'https://images.unsplash.com/photo-1610502778270-c5c6f4c7d575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRzaGlydCUyMG1vY2t1cHxlbnwxfHx8fDE3NzAyNjQ2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      price: '₩45,000',
      colors: ['#000000', '#1a1a1a', '#2d2d2d'],
      description: 'ZEUS 스튜디오 시그니처 블랙 티셔츠',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      details: '프리미엄 코튼 100% 소재로 제작된 고급 티셔츠입니다. ZEUS 로고가 프린팅되어 있으며, 편안한 착용감과 세련된 디자인이 특징입니다.',
    },
    {
      id: 2,
      name: 'ZEUS Studio White Tee',
      image: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMG1vY2t1cHxlbnwxfHx8fDE3NzAxNTI2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      price: '₩45,000',
      colors: ['#ffffff', '#f5f5f5', '#e8e8e8'],
      description: '깔끔한 화이트 컬러의 ZEUS 티셔츠',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      details: '산뜻한 화이트 컬러로 어떤 스타일과도 잘 어울리는 베이직 티셔츠입니다. 고급 원단과 정교한 마감이 돋보입니다.',
    },
    {
      id: 3,
      name: 'ZEUS Limited Gray',
      image: 'https://images.unsplash.com/photo-1717062529011-b1c63627b96f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwdHNoaXJ0JTIwZGVzaWdufGVufDF8fHx8MTc3MDI2NDY4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      price: '₩48,000',
      colors: ['#808080', '#696969', '#a9a9a9'],
      description: '한정판 그레이 컬렉션',
      sizes: ['S', 'M', 'L', 'XL'],
      details: '한정 수량으로 제작된 특별 에디션입니다. 독특한 그레이 톤과 고급스러운 디테일이 특징입니다.',
    },
    {
      id: 4,
      name: 'ZEUS Streetwear Edition',
      image: 'https://images.unsplash.com/photo-1696086152513-c74dc1d4b135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwdHNoaXJ0fGVufDF8fHx8MTc3MDI2NDY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      price: '₩52,000',
      colors: ['#1a1a1a', '#000000', '#2d2d2d'],
      description: '스트릿 스타일 콜라보 티셔츠',
      sizes: ['M', 'L', 'XL', 'XXL'],
      details: '도심 스트릿 문화에서 영감을 받은 대담한 디자인의 티셔츠입니다. 오버핏 스타일로 편안한 착용감을 제공합니다.',
    },
    {
      id: 5,
      name: 'ZEUS Minimal Beige',
      image: 'https://images.unsplash.com/photo-1720534490358-bc2ad29d51d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHRzaGlydCUyMG1pbmltYWx8ZW58MXx8fHwxNzcwMjY0NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: '₩46,000',
      colors: ['#f5f5dc', '#d2b48c', '#daa520'],
      description: '미니멀 베이지 컬렉션',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      details: '부드러운 베이지 컬러와 미니멀한 디자인이 조화를 이루는 제품입니다. 사계절 내내 착용하기 좋습니다.',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="shop" className="relative min-h-screen bg-black py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl mb-12 text-center">Shop</h2>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center rounded-full -translate-x-4"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center rounded-full translate-x-4"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Products Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide flex gap-6 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-80 bg-zinc-900/50 rounded-2xl p-6 hover:bg-zinc-900/70 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-square mb-6 rounded-xl overflow-hidden bg-zinc-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <h3 className="text-xl">{product.name}</h3>
                  
                  {/* Color Options */}
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Price */}
                  <p className="text-lg">{product.price}</p>

                  {/* Buy Button */}
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded-full text-sm transition-colors font-medium"
                  >
                    구입하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}