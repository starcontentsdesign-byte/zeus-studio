'use client';

import { useEffect } from 'react';
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

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
};

export default function CartModal({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity
}: CartModalProps) {
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

  const getTotalPrice = () =>
    items.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[₩,]/g, ''), 10);
      return total + price * item.quantity;
    }, 0);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      <div
        className={`absolute right-0 top-0 h-full w-full bg-zinc-900 transition-transform duration-500 md:w-96 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
            <h2 className="text-2xl">장바구니</h2>
            <button onClick={onClose} className="transition-opacity hover:opacity-70">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center opacity-60">
                <p className="text-sm">장바구니가 비어있습니다</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-lg bg-zinc-800/50 p-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-700">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium">{item.name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <div
                          className="h-4 w-4 rounded-full border border-white/20"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs opacity-60">{item.size}</span>
                      </div>
                      <p className="mt-2 text-sm">{item.price}</p>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="flex h-6 w-6 items-center justify-center rounded bg-zinc-700 text-xs hover:bg-zinc-600"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded bg-zinc-700 text-xs hover:bg-zinc-600"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="self-start transition-opacity hover:opacity-70"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="space-y-4 border-t border-white/10 px-6 py-6">
              <div className="flex items-center justify-between text-lg">
                <span>총 금액</span>
                <span className="font-medium">₩{getTotalPrice().toLocaleString()}</span>
              </div>

              <button
                onClick={() => {
                  alert('구매 기능은 데모 버전입니다.');
                  onClose();
                }}
                className="w-full rounded-full bg-white py-4 font-medium text-black transition-colors hover:bg-gray-200"
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
