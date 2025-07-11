import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Download, Mail, Phone } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import PaymentGateway from '../components/PaymentGateway';
import InvoiceGenerator from '../components/InvoiceGenerator';
import toast from 'react-hot-toast';
import { notificationService } from '../services/notificationService';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { currentBooking, addBooking } = useBooking();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [guestInfo, setGuestInfo] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialRequests: ''
  });
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    if (!currentBooking) {
      navigate('/stays');
    }
  }, [currentBooking, navigate]);

  const applyDiscount = () => {
    const discountCodes = {
      'WELCOME10': 10,
      'RURAL20': 20,
      'FIRSTTIME': 15
    };
    
    const discountPercent = discountCodes[discountCode as keyof typeof discountCodes];
    if (discountPercent) {
      setDiscount(discountPercent);
      toast.success(`${discountPercent}% discount applied!`);
    } else {
      toast.error('Invalid discount code');
    }
  };

  const calculateTotal = () => {
    if (!currentBooking) return 0;
    const subtotal = currentBooking.totalAmount || 0;
    const discountAmount = (subtotal * discount) / 100;
    const taxes = subtotal * 0.12; // 12% GST
    return subtotal - discountAmount + taxes;
  };

  const handlePaymentSuccess = async (paymentData: any) => {
    const refId = `VS${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    setReferenceId(refId);
    
    const finalBooking = {
      ...currentBooking,
      id: refId,
      userId: user?.id || '',
      status: 'confirmed' as const,
      paymentId: paymentData.paymentId,
      totalAmount: calculateTotal(),
      discount,
      guestInfo,
      createdAt: new Date().toISOString()
    };

    addBooking(finalBooking as any);
    setBookingConfirmed(true);
    setStep(4);
    
    // Send confirmation notifications
    await notificationService.sendBookingConfirmation(finalBooking);
    
    toast.success('Booking confirmed successfully!');
  };

  if (!currentBooking) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNum ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNum ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <span className="text-sm text-gray-600">
              {step === 1 && 'Guest Information'}
              {step === 2 && 'Booking Summary'}
              {step === 3 && 'Payment'}
              {step === 4 && 'Confirmation'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Guest Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={guestInfo.firstName}
                        onChange={(e) => setGuestInfo({ ...guestInfo, firstName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={guestInfo.lastName}
                        onChange={(e) => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={guestInfo.email}
                      onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={guestInfo.phone}
                      onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={guestInfo.specialRequests}
                      onChange={(e) => setGuestInfo({ ...guestInfo, specialRequests: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Any special requirements or preferences..."
                    />
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Continue to Summary
                </button>
              </motion.div>
            )}

            {/* Step 2: Booking Summary */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={currentBooking.homestay?.images[0]}
                      alt={currentBooking.homestay?.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{currentBooking.homestay?.title}</h3>
                      <p className="text-gray-600">
                        {currentBooking.homestay?.location.village}, {currentBooking.homestay?.location.state}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Check-in:</span>
                      <span className="font-semibold">{currentBooking.checkIn}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Check-out:</span>
                      <span className="font-semibold">{currentBooking.checkOut}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span>Guests:</span>
                      <span className="font-semibold">{currentBooking.guests}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Discount code"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <button
                        onClick={applyDiscount}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:border-green-600 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
                <PaymentGateway
                  amount={calculateTotal()}
                  onSuccess={handlePaymentSuccess}
                  onError={(error) => toast.error('Payment failed. Please try again.')}
                  guestInfo={guestInfo}
                />
                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-4 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:border-green-600 transition-colors"
                >
                  Back to Summary
                </button>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && bookingConfirmed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-4">
                  Your booking has been confirmed. Reference ID: <strong>{referenceId}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  A confirmation email has been sent to {guestInfo.email}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <InvoiceGenerator
                    booking={{
                      ...currentBooking,
                      id: referenceId,
                      guestInfo,
                      totalAmount: calculateTotal(),
                      discount
                    } as any}
                  />
                  <button
                    onClick={() => navigate('/profile')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-green-600 transition-colors"
                  >
                    View Bookings
                  </button>
                  <button
                    onClick={() => navigate('/stays')}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                  >
                    Book Another Stay
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{currentBooking.totalAmount?.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{((currentBooking.totalAmount || 0) * discount / 100).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>₹{((currentBooking.totalAmount || 0) * 0.12).toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;