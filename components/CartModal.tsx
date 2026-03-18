import React, { useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  image: string;
  price: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export function CartModal({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }: CartModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[₩,]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      {/* Cart Content */}
      <div
        className={`absolute top-0 right-0 h-full w-full md:w-96 bg-zinc-900 transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <h2 className="text-2xl">장바구니</h2>
            <button
              onClick={onClose}
              className="hover:opacity-70 transition-opacity"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                <p className="text-sm">장바구니가 비어있습니다</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-zinc-800/50 rounded-lg">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-700 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs opacity-60">{item.size}</span>
                      </div>
                      <p className="text-sm mt-2">{item.price}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 bg-zinc-700 hover:bg-zinc-600 rounded flex items-center justify-center text-xs"
                        >
                          -
                        </button>
                        <span className="text-xs w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 bg-zinc-700 hover:bg-zinc-600 rounded flex items-center justify-center text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="self-start hover:opacity-70 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-white/10 px-6 py-6 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span>총 금액</span>
                <span className="font-medium">₩{getTotalPrice().toLocaleString()}</span>
              </div>
              
              <button
                onClick={() => {
                  alert('구매 기능은 데모 버전입니다.');
                  onClose();
                }}
                className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-full transition-colors font-medium"
              >
                구매하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
