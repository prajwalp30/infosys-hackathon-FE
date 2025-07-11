import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, QrCode, Building } from 'lucide-react';
import toast from 'react-hot-toast';
import TermsModal from './TermsModal';

interface PaymentGatewayProps {
  amount: number;
  onSuccess: (paymentData: any) => void;
  onError: (error: string) => void;
  guestInfo: any;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ amount, onSuccess, onError, guestInfo }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [pendingPayment, setPendingPayment] = useState<any>(null);
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: Smartphone, description: 'Pay with Google Pay, PhonePe, Paytm' },
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', label: 'Net Banking', icon: Building, description: 'All major banks supported' },
    { id: 'qr', label: 'QR Code', icon: QrCode, description: 'Scan and pay' }
  ];

  const handlePayment = async () => {
    // Show terms before payment
    setPendingPayment({ paymentMethod, upiId, cardDetails });
    setShowTerms(true);
  };

  const processPayment = async () => {
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock payment success
      const paymentData = {
        paymentId: `pay_${Date.now()}`,
        method: pendingPayment.paymentMethod,
        amount,
        status: 'success',
        timestamp: new Date().toISOString()
      };

      // Simulate UPI app redirect for UPI payments
      if (pendingPayment.paymentMethod === 'upi') {
        const upiUrl = `upi://pay?pa=${pendingPayment.upiId || 'villagestay@paytm'}&pn=VillageStay&am=${amount}&cu=INR&tn=Homestay Booking Payment`;
        
        // In a real app, this would open the UPI app
        toast.success('Redirecting to UPI app...');
        
        // Simulate UPI app response
        setTimeout(() => {
          onSuccess(paymentData);
        }, 1000);
      } else {
        onSuccess(paymentData);
      }
    } catch (error) {
      onError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
      setShowTerms(false);
      setPendingPayment(null);
    }
  };

  const handleTermsAccept = () => {
    processPayment();
  };

  const handleTermsClose = () => {
    setShowTerms(false);
    setPendingPayment(null);
  };

  const generateQRCode = () => {
    const upiString = `upi://pay?pa=villagestay@paytm&pn=VillageStay&am=${amount}&cu=INR&tn=Homestay Booking Payment`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}`;
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`p-4 rounded-xl border-2 text-left transition-colors ${
                paymentMethod === method.id
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-300 hover:border-green-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <method.icon className={`w-6 h-6 ${
                  paymentMethod === method.id ? 'text-green-600' : 'text-gray-600'
                }`} />
                <div>
                  <p className={`font-semibold ${
                    paymentMethod === method.id ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {method.label}
                  </p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-gray-50 rounded-xl p-6">
        {paymentMethod === 'upi' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">UPI Payment</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID (Optional)
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@paytm"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">
                Leave empty to choose from available UPI apps
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                You'll be redirected to your UPI app to complete the payment
              </p>
            </div>
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Card Details</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {paymentMethod === 'netbanking' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Net Banking</h4>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="">Select your bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
              <option value="kotak">Kotak Mahindra Bank</option>
              <option value="pnb">Punjab National Bank</option>
            </select>
          </div>
        )}

        {paymentMethod === 'qr' && (
          <div className="space-y-4 text-center">
            <h4 className="font-semibold text-gray-900">Scan QR Code</h4>
            <div className="flex justify-center">
              <img
                src={generateQRCode()}
                alt="Payment QR Code"
                className="w-48 h-48 border border-gray-300 rounded-lg"
              />
            </div>
            <p className="text-sm text-gray-600">
              Scan this QR code with any UPI app to pay ₹{amount.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* Payment Summary */}
      <div className="bg-green-50 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">Total Amount:</span>
          <span className="text-2xl font-bold text-green-600">₹{amount.toLocaleString()}</span>
        </div>
      </div>

      {/* Pay Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePayment}
        disabled={processing}
        className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {processing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>Pay ₹{amount.toLocaleString()}</span>
          </>
        )}
      </motion.button>

      {/* Security Notice */}
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Your payment information is secure and encrypted</span>
      </div>

      <TermsModal
        isOpen={showTerms}
        onClose={handleTermsClose}
        onAccept={handleTermsAccept}
        type="booking"
      />
    </div>
  );
};

export default PaymentGateway;