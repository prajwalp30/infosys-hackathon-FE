import toast from 'react-hot-toast';

interface EmailData {
  to: string;
  subject: string;
  template: string;
  data: any;
}

interface SMSData {
  to: string;
  message: string;
}

class NotificationService {
  // Mock email service
  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // In a real app, this would integrate with services like SendGrid, AWS SES, etc.
      console.log('Sending email:', emailData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Email sent to ${emailData.to}`);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error('Failed to send email');
      return false;
    }
  }

  // Mock SMS service
  async sendSMS(smsData: SMSData): Promise<boolean> {
    try {
      // In a real app, this would integrate with services like Twilio, AWS SNS, etc.
      console.log('Sending SMS:', smsData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`SMS sent to ${smsData.to}`);
      return true;
    } catch (error) {
      console.error('SMS sending failed:', error);
      toast.error('Failed to send SMS');
      return false;
    }
  }

  // Booking confirmation notifications
  async sendBookingConfirmation(booking: any): Promise<void> {
    const emailData: EmailData = {
      to: booking.guestInfo.email,
      subject: 'Booking Confirmation - VillageStay',
      template: 'booking-confirmation',
      data: {
        guestName: `${booking.guestInfo.firstName} ${booking.guestInfo.lastName}`,
        homestayName: booking.homestay.title,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        totalAmount: booking.totalAmount,
        referenceId: booking.id
      }
    };

    const smsData: SMSData = {
      to: booking.guestInfo.phone,
      message: `VillageStay: Your booking at ${booking.homestay.title} is confirmed! Reference: ${booking.id}. Check-in: ${booking.checkIn}. Total: ₹${booking.totalAmount}`
    };

    await Promise.all([
      this.sendEmail(emailData),
      this.sendSMS(smsData)
    ]);
  }

  // Host application confirmation
  async sendHostApplicationConfirmation(hostData: any): Promise<void> {
    const emailData: EmailData = {
      to: hostData.contactEmail,
      subject: 'Host Application Received - VillageStay',
      template: 'host-application',
      data: {
        hostName: hostData.propertyName,
        propertyName: hostData.propertyName,
        location: `${hostData.village}, ${hostData.state}`
      }
    };

    const smsData: SMSData = {
      to: hostData.contactPhone,
      message: `VillageStay: Your host application for ${hostData.propertyName} has been received. We'll review it within 2-3 business days.`
    };

    await Promise.all([
      this.sendEmail(emailData),
      this.sendSMS(smsData)
    ]);
  }

  // Booking reminder (24 hours before check-in)
  async sendBookingReminder(booking: any): Promise<void> {
    const emailData: EmailData = {
      to: booking.guestInfo.email,
      subject: 'Check-in Reminder - VillageStay',
      template: 'booking-reminder',
      data: {
        guestName: `${booking.guestInfo.firstName} ${booking.guestInfo.lastName}`,
        homestayName: booking.homestay.title,
        checkIn: booking.checkIn,
        hostContact: booking.homestay.host.phone
      }
    };

    const smsData: SMSData = {
      to: booking.guestInfo.phone,
      message: `VillageStay: Reminder - Your check-in at ${booking.homestay.title} is tomorrow (${booking.checkIn}). Host contact: ${booking.homestay.host.phone}`
    };

    await Promise.all([
      this.sendEmail(emailData),
      this.sendSMS(smsData)
    ]);
  }

  // Cancellation notifications
  async sendCancellationNotification(booking: any): Promise<void> {
    const emailData: EmailData = {
      to: booking.guestInfo.email,
      subject: 'Booking Cancellation - VillageStay',
      template: 'booking-cancellation',
      data: {
        guestName: `${booking.guestInfo.firstName} ${booking.guestInfo.lastName}`,
        homestayName: booking.homestay.title,
        refundAmount: booking.refundAmount,
        referenceId: booking.id
      }
    };

    const smsData: SMSData = {
      to: booking.guestInfo.phone,
      message: `VillageStay: Your booking ${booking.id} has been cancelled. Refund of ₹${booking.refundAmount} will be processed in 5-7 business days.`
    };

    await Promise.all([
      this.sendEmail(emailData),
      this.sendSMS(smsData)
    ]);
  }
}

export const notificationService = new NotificationService();