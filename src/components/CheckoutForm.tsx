'use client';

import { useState } from 'react';
import { CartItem } from '@/contexts/CartContext';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
}

export default function CheckoutForm({ 
  isOpen, 
  onClose, 
  cartItems,
  total 
}: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form and close after showing success message
    setTimeout(() => {
      setFormData({ phone: '', email: '', notes: '' });
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-foreground rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
          
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">
                      Finalizar Pedido
                    </h2>
                    <p className="text-highlight">
                      Completa tus datos y nos pondremos en contacto contigo
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="text-highlight hover:text-primary transition-colors ml-4 disabled:opacity-50"
                    aria-label="Cerrar"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-6 border-b border-gray-200 bg-white">
                <h3 className="font-semibold text-primary mb-3">Resumen de tu pedido</h3>
                <div className="space-y-2 mb-3">
                  {cartItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <span className="text-primary">{item.name}</span>
                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <div className="text-xs text-highlight ml-2">
                            ({Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(', ')})
                          </div>
                        )}
                      </div>
                      <span className="text-highlight ml-2">x{item.quantity}</span>
                      <span className="text-primary font-medium ml-3">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-lg font-bold text-primary pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-accent">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Contact Info Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex gap-3">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm">
                      <p className="font-semibold text-blue-900 mb-1">Te contactaremos pronto</p>
                      <p className="text-blue-700">
                        Recibirás un mensaje por WhatsApp o correo para confirmar tu pedido y coordinar la entrega.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                    Número de Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ej: +52 123 456 7890"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent transition-colors text-primary bg-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Correo Electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@correo.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent transition-colors text-primary bg-white"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-primary mb-2">
                    Notas Adicionales (Opcional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Dirección de entrega, preferencias de horario, etc."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-accent transition-colors text-primary bg-white resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:opacity-90 text-white text-lg font-semibold py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      'Enviar Pedido'
                    )}
                  </button>
                </div>

                {/* Security Note */}
                <div className="text-center text-xs text-highlight pt-2">
                  <p>Al enviar este pedido, aceptas que nos pongamos en contacto contigo</p>
                </div>
              </form>
            </>
          ) : (
            /* Success Message */
            <div className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">
                ¡Pedido Recibido!
              </h3>
              <p className="text-highlight mb-2">
                Gracias por tu pedido. Nos pondremos en contacto contigo pronto.
              </p>
              <p className="text-sm text-highlight">
                Revisa tu WhatsApp o correo electrónico
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

