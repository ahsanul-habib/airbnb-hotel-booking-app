"use server"

import { auth } from '@/auth';
import Payment from '@/models/paymentModel';
import CryptoJS from 'crypto-js';
import makeEmail from '../owner/makeEmail';

export default async function updatePaymentStatus(encryptedPaymentID) {
  try {
    if (!encryptedPaymentID) {
      return { success: false, error: 'Encrypted payment ID is required.' };
    }

    const session = await auth();
    if (!session || !session.user) {
      return { success: false, error: 'You must be logged in to perform this action.' };
    }

    const paymentID=CryptoJS.AES.decrypt(encryptedPaymentID.replace(/-/g, "+").replace(/_/g, "/"), process.env.SSL_Commertz_SecretKey).toString(CryptoJS.enc.Utf8);
    if (!paymentID) {
      return { success: false, error: 'Invalid encrypted payment ID.' };
    }

    const payment = await Payment.findById(paymentID).populate('user');
    if (!payment) {
      return { success: false, error: 'Payment not found.' };
    }

    if (payment.user.id !== session.user.id) {
      return { success: false, error: 'You are not authorized to update this payment.' };
    }

    if (payment.paymentStatus === 'paid') {
      return { success: false, error: 'Payment is already paid.',paymentID };
    }

    const result = await Payment.updateOne({ _id: paymentID }, { paymentStatus: 'paid' });

    const emailResponse = await makeEmail(paymentID);

    if (result.modifiedCount > 0) {
      return { success: true ,paymentID};
    } else {
      return { success: false, error: 'Failed to update payment status.' };
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
    return { success: false, error: 'Internal server error' };
  }
}
