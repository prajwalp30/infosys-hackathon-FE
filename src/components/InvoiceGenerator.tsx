import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Phone } from 'lucide-react';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

interface InvoiceGeneratorProps {
  booking: any;
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ booking }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Set font
    doc.setFont('helvetica');
    
    // Header - TAX INVOICE
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('TAX INVOICE', 20, 25);
    
    // VillageStay Logo/Brand (right side)
    doc.setFontSize(20);
    doc.setTextColor(34, 197, 94); // Green color
    doc.text('VillageStay', 140, 25);
    
    // Company Details (right side)
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text('VILLAGESTAY (INDIA) PRIVATE LIMITED', 140, 35);
    doc.text('19th Floor, Epitome Building No.5,', 140, 42);
    doc.text('DLF Cybercity, DLF Phase III,', 140, 49);
    doc.text('Gurgaon, Haryana, 122001', 140, 56);
    
    // Invoice Details (left side)
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Booking ID:', 20, 45);
    doc.setFont('helvetica', 'normal');
    doc.text(booking.id, 20, 52);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice No:', 20, 62);
    doc.setFont('helvetica', 'normal');
    doc.text(`INV${booking.id.slice(-8)}`, 20, 69);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Date:', 20, 79);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date(booking.createdAt).toLocaleDateString('en-GB'), 20, 86);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Date of Supply:', 20, 96);
    doc.setFont('helvetica', 'normal');
    doc.text(booking.checkIn, 20, 103);
    
    // PAN and other details (right side)
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('PAN:', 140, 70);
    doc.setFont('helvetica', 'normal');
    doc.text('AADCM5146R', 140, 77);
    
    doc.setFont('helvetica', 'bold');
    doc.text('HSN/SAC:', 140, 87);
    doc.setFont('helvetica', 'normal');
    doc.text('996552', 140, 94);
    
    doc.setFont('helvetica', 'bold');
    doc.text('GSTIN:', 140, 104);
    doc.setFont('helvetica', 'normal');
    doc.text('06AADCM5146R1ZZ', 140, 111);
    
    // Customer Details Section
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Customer Details:', 20, 125);
    
    // Draw line
    doc.line(20, 130, 190, 130);
    
    // Customer info in columns
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Company Legal Name', 20, 140);
    doc.text('Company Trade Name', 70, 140);
    doc.text('Customer Name', 120, 140);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`${booking.guestInfo.firstName} ${booking.guestInfo.lastName}`, 20, 147);
    doc.text(`${booking.guestInfo.firstName} ${booking.guestInfo.lastName}`, 70, 147);
    doc.text(`${booking.guestInfo.firstName} ${booking.guestInfo.lastName}`, 120, 147);
    
    // Booking Details
    doc.setFont('helvetica', 'bold');
    doc.text('Hotel Name', 20, 160);
    doc.text('Hotel City', 70, 160);
    doc.text('Check-in', 120, 160);
    doc.text('Check-out', 160, 160);
    
    doc.setFont('helvetica', 'normal');
    doc.text(booking.homestay.title, 20, 167);
    doc.text(`${booking.homestay.location.village}`, 70, 167);
    doc.text(new Date(booking.checkIn).toLocaleDateString('en-GB'), 120, 167);
    doc.text(new Date(booking.checkOut).toLocaleDateString('en-GB'), 160, 167);
    
    // Payment Breakdown Section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('PAYMENT BREAKUP', 20, 185);
    
    // Draw rectangle for payment details
    doc.rect(20, 190, 170, 60);
    
    // Payment items
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const subtotal = booking.totalAmount / 1.12; // Remove taxes to get subtotal
    const serviceFee = subtotal * 0.05;
    const gst = subtotal * 0.12;
    const discount = booking.discount ? (subtotal * booking.discount / 100) : 0;
    
    let yPos = 200;
    
    // Accommodation Charges
    doc.text('*Accommodation Charges', 25, yPos);
    doc.text(`₹${subtotal.toFixed(2)}`, 160, yPos);
    doc.setFontSize(8);
    doc.text('*Charges of applicable taxes collected on behalf of hotels', 25, yPos + 5);
    
    yPos += 15;
    doc.setFontSize(10);
    doc.text('Service Fees', 25, yPos);
    doc.text(`₹${serviceFee.toFixed(2)}`, 160, yPos);
    
    if (discount > 0) {
      yPos += 10;
      doc.text(`Discount (${booking.discount}%)`, 25, yPos);
      doc.text(`-₹${discount.toFixed(2)}`, 160, yPos);
    }
    
    yPos += 10;
    doc.text('IGST @18%', 25, yPos);
    doc.text(`₹${gst.toFixed(2)}`, 160, yPos);
    
    // Draw line for total
    doc.line(25, yPos + 5, 185, yPos + 5);
    
    yPos += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('Grand Total', 25, yPos);
    doc.text(`₹${booking.totalAmount.toFixed(2)}`, 160, yPos);
    
    // Terms and Conditions
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Input tax credit of GST charged by the original service provider is available only against the invoice issued by the', 20, 265);
    doc.text('respective service provider. VillageStay acts only as a facilitator for these services.', 20, 272);
    doc.text('This is not a valid travel document', 20, 279);
    
    // Terms & Conditions Header
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('TERMS & CONDITIONS', 20, 290);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('1. Cancellation charges as applicable will be charged as per the hotel policy. Please refer back to MMT CONNECT within 48 hours of receipt of invoice.', 20, 298);
    doc.text('2. GST extra for B2B and B2C category invoices can only be generated using app downloaded from the link', 20, 305);
    doc.text('3. https://invoice.makemytrip.com/invoice/gstInvoice/auth', 20, 312);
    
    // Footer
    doc.setFontSize(7);
    doc.text('Registered Office:', 20, 280);
    doc.text('19th Floor, Epitome Building No.5, DLF Cybercity, DLF Phase III, Gurgaon, Haryana, 122001', 20, 287);
    
    doc.text(`MOBIL${Date.now().toString().slice(-8)}`, 160, 280);
    doc.text('Page 1 of 1', 160, 287);
    
    // Save the PDF
    doc.save(`VillageStay-Invoice-${booking.id}.pdf`);
    toast.success('Professional invoice downloaded successfully!');
  };

  const sendInvoiceByEmail = async () => {
    // In a real application, this would call an API to send the email
    toast.success(`Invoice sent to ${booking.guestInfo.email}`);
  };

  const sendInvoiceBySMS = async () => {
    // In a real application, this would call an API to send SMS
    toast.success(`Invoice link sent to ${booking.guestInfo.phone}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generatePDF}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Download className="w-4 h-4" />
        <span>Download Invoice</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={sendInvoiceByEmail}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-green-600 transition-colors"
      >
        <Mail className="w-4 h-4" />
        <span>Email Invoice</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={sendInvoiceBySMS}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-green-600 transition-colors"
      >
        <Phone className="w-4 h-4" />
        <span>SMS Invoice</span>
      </motion.button>
    </div>
  );
};

export default InvoiceGenerator;