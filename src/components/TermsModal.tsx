import React from 'react';
import { motion } from 'framer-motion';
import { X, Shield, FileText, AlertCircle } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  type: 'signup' | 'booking' | 'hosting';
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAccept, type }) => {
  if (!isOpen) return null;

  const getContent = () => {
    switch (type) {
      case 'signup':
        return {
          title: 'Terms of Service & Privacy Policy',
          icon: FileText,
          sections: [
            {
              title: 'Terms of Service',
              content: [
                'By creating an account with VillageStay, you agree to our terms and conditions.',
                'You must be at least 18 years old to use our services.',
                'You are responsible for maintaining the confidentiality of your account.',
                'You agree to provide accurate and complete information.',
                'We reserve the right to suspend or terminate accounts that violate our terms.'
              ]
            },
            {
              title: 'Privacy Policy',
              content: [
                'We collect personal information to provide and improve our services.',
                'Your data is encrypted and stored securely.',
                'We do not sell your personal information to third parties.',
                'You can request deletion of your data at any time.',
                'We use cookies to enhance your browsing experience.'
              ]
            }
          ]
        };
      case 'booking':
        return {
          title: 'Booking Terms & Cancellation Policy',
          icon: Shield,
          sections: [
            {
              title: 'Booking Terms',
              content: [
                'All bookings are subject to host approval.',
                'Payment is processed securely through our payment partners.',
                'You will receive a confirmation email upon successful booking.',
                'Check-in and check-out times are set by individual hosts.',
                'Additional guests beyond the stated capacity may incur extra charges.'
              ]
            },
            {
              title: 'Cancellation Policy',
              content: [
                'Free cancellation up to 24 hours before check-in.',
                'Cancellations within 24 hours are subject to a 50% charge.',
                'No-shows will be charged the full amount.',
                'Hosts may have their own cancellation policies.',
                'Refunds are processed within 5-7 business days.'
              ]
            },
            {
              title: 'Payment Terms',
              content: [
                'All payments are processed in Indian Rupees (INR).',
                'We accept UPI, credit/debit cards, and net banking.',
                'A service fee of 5% is added to all bookings.',
                'GST of 12% is applicable on all transactions.',
                'Payment is required at the time of booking.'
              ]
            }
          ]
        };
      case 'hosting':
        return {
          title: 'Host Agreement & Policies',
          icon: AlertCircle,
          sections: [
            {
              title: 'Host Responsibilities',
              content: [
                'Provide accurate descriptions and photos of your property.',
                'Maintain cleanliness and safety standards.',
                'Respond to guest inquiries within 24 hours.',
                'Honor confirmed bookings unless exceptional circumstances arise.',
                'Comply with local laws and regulations.'
              ]
            },
            {
              title: 'Commission & Payments',
              content: [
                'VillageStay charges a 15% commission on all bookings.',
                'Payments are transferred within 24 hours of guest check-in.',
                'You are responsible for applicable taxes on your earnings.',
                'Cancellation fees may apply for host-initiated cancellations.',
                'We provide monthly earning statements.'
              ]
            },
            {
              title: 'Quality Standards',
              content: [
                'Properties must meet our safety and quality guidelines.',
                'Regular inspections may be conducted.',
                'Maintain a minimum rating of 4.0 stars.',
                'Provide basic amenities as listed in your property description.',
                'Ensure guest privacy and security.'
              ]
            }
          ]
        };
      default:
        return { title: '', icon: FileText, sections: [] };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <content.icon className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">{content.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-8">
            {content.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-green-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onAccept}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                I Agree to Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsModal;