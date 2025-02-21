"use server"

import transporter from "@/lib/emailTransporter";
import generateReceiptPDF from "./generateReceiptPDF";
import stringToFilename from "@/utils/convertStringToFileName";

const makeEmail= async(paymentID) => {
    const response = await generateReceiptPDF(paymentID);
    if(!response.success){
        return { success: false, message: response.message };
    }

    try{
        const emailResponseMessage=await transporter.sendMail({
            from: process.env.SMTP_Email,
        to: response.email,
        subject: `Payment Receipt for Payment ID: ${paymentID}`,
        text: 'Thanks for the purchase. See you at the hotel!',
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f7f7f7;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
              text-align: center;
              color: #2c3e50;
            }
            .header {
              background-color: #3498db;
              padding: 10px;
              border-radius: 5px;
              color: white;
              text-align: center;
            }
            .payment-details {
              margin-top: 20px;
            }
            .payment-details td {
              padding: 8px;
            }
            .payment-details th {
              text-align: left;
              padding-bottom: 10px;
              font-weight: bold;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 14px;
              color: #7f8c8d;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Payment Receipt</h1>
            </div>
            <p>Dear ${response.payment.user.name},</p>
            <p>Thank you for your payment. Your transaction has been successfully processed!</p>
            
            <div class="payment-details">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <th>Payment ID</th>
                  <td>${paymentID}</td>
                </tr>
                <tr>
                  <th>Hotel</th>
                  <td>${response.payment.hotel?.title || 'Airbnb'}</td>
                </tr>
                <tr>
                  <th>Amount Paid</th>
                  <td>${response.payment.amount}</td>
                </tr>
                <tr>
                  <th>CheckIn</th>
                  <td>${new Date(response.payment.checkIn).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>CheckOut</th>
                  <td>${new Date(response.payment.checkOut).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Payment Date</th>
                  <td>${new Date(response.payment.createdAt).toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
            
            <div class="footer">
              <p>Thanks for your purchase! We look forward to welcoming you at the hotel.</p>
            </div>
          </div>
        </body>
        </html>
      `,
        attachments: [
            {
                filename: `payment-receipt-${stringToFilename(response?.payment?.hotel?.title||"airbnb")}.pdf`,
                content: response.pdf,
                contentType: 'application/pdf',
                encoding: 'base64'
            },
        ],
    });

    return { success: true, message: 'Email sent successfully', emailResponseMessage };
} catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: 'Error sending email' };
}

}

export default makeEmail;