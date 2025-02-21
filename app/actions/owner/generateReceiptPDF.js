
import { PDFDocument, rgb,StandardFonts } from 'pdf-lib';
import { getPaymentDetails } from "@/app/actions/guest/getPaymentDetails";
import calculateRatings from "@/utils/calculateRatings";
import { format } from 'date-fns';
import { auth } from '@/auth';

const generateReceiptPDF = async(paymentID) => {
    const response = await getPaymentDetails(paymentID);
    const session=await auth();

    if(!session?.user?.email){
        return {
            success: false,
            message: `User not authenticated. Please login.`,
        }
    }

    if (!response || !response?.success) {
        if (response?.message === "User not authenticated") {
          return {
            success: false,
            message: `User not authenticated. Please login.`,
          };
        } else if (
          response?.message === "Invalid payment ID" ||
          response?.message === "Payment not found"
        ) {
          return {
            success: false,
            message: "Payment not found",
          };
        } else if (response?.message === "Unauthorized access") {
          return {
            success: false,
            message: "Unauthorized access.",
          };
        } else {
          return {
            success: false,
            message: "An unknown error occurred.",
          };
        }
      }

    const paymentDetails = response.payment;

    if (paymentDetails?.status === "pending") {
        return {
            success: false,
            message: "Payment is pending. Receipt cannot be generated."
        };
    }

    try{
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595.276, 841.890]);
        
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        const { width, height } = page.getSize();
        const margin = 50;

        const greenColor = rgb(0.133, 0.773, 0.369);
        const grayColor = rgb(0.4, 0.4, 0.4);
        const lightGrayColor = rgb(0.6, 0.6, 0.6);
        const bgGreenColor = rgb(0.9, 0.98, 0.9); 
        
        const centerText = (text, size, font = helveticaFont) => {
            const textWidth = font.widthOfTextAtSize(text, size);
            return (width - textWidth) / 2;
        };

        page.drawText('Payment Receipt', {
            x: centerText('Payment Receipt', 28, helveticaBold),
            y: height - 80,
            size: 28,
            font: helveticaBold,
            color: greenColor,
        });

        page.drawText('Your booking details are below', {
            x: centerText('Your booking details are below', 14),
            y: height - 110,
            size: 14,
            font: helveticaFont,
            color: grayColor,
        });

        page.drawRectangle({
            x: margin - 20,
            y: height - 250,
            width: width - (margin - 20) * 2,
            height: 100,
            color: bgGreenColor,
            borderColor: rgb(0.8, 0.9, 0.8),
            borderWidth: 1,
            opacity: 0.5,
            borderOpacity: 0.2,
        });

        const hotelY = height - 180;
        
        page.drawText(paymentDetails.hotel.title, {
            x: margin,
            y: hotelY,
            size: 24,
            font: helveticaBold,
            color: greenColor
        });

        page.drawText(paymentDetails.hotel.description, {
            x: margin,
            y: hotelY - 30,
            size: 14,
            font: helveticaFont,
            color: grayColor,
        });

        page.drawText(`Ratings: ${calculateRatings(paymentDetails.hotel)} (${paymentDetails.hotel.ratings.length} reviews)`, {
            x: margin,
            y: hotelY - 60,
            size: 14,
            font: helveticaFont,
            color: lightGrayColor,
        });

        const detailsY = hotelY - 140;
        const columnWidth = (width - (margin * 3)) / 2;
        const detailsHeight = 150;

        page.drawRectangle({
            x: margin - 20,
            y: detailsY - detailsHeight + 20,
            width: columnWidth + 40,
            height: detailsHeight,
            color: bgGreenColor,
            borderColor: rgb(0.8, 0.9, 0.8),
            borderWidth: 1,
            opacity: 0.5,
            borderOpacity: 0.2,
        });

        page.drawRectangle({
            x: margin * 2 + columnWidth - 20,
            y: detailsY - detailsHeight + 20,
            width: columnWidth + 40,
            height: detailsHeight,
            color: bgGreenColor,
            borderColor: rgb(0.8, 0.9, 0.8),
            borderWidth: 1,
            opacity: 0.5,
            borderOpacity: 0.2,
        });

        page.drawText('Booking Details', {
            x: margin,
            y: detailsY,
            size: 18,
            font: helveticaBold,
            color: greenColor,
        });

        page.drawText('Guest Details', {
            x: margin * 2 + columnWidth,
            y: detailsY,
            size: 18,
            font: helveticaBold,
            color: greenColor,
        });

        const bookingDetails = [
            ['Check-in:', format(paymentDetails.checkIn, 'yyyy-MM-dd')],
            ['Check-out:', format(paymentDetails.checkOut, 'yyyy-MM-dd')],
            ['Issued at:', format(paymentDetails.createdAt, 'yyyy-MM-dd')],
            ['Guests:', paymentDetails.guests.toString()],
        ];

        bookingDetails.forEach((detail, index) => {
            const yPos = detailsY - 30 - (index * 25);
            page.drawText(detail[0], {
                x: margin,
                y: yPos,
                size: 12,
                font: helveticaFont,
                color: grayColor,
            });
            page.drawText(detail[1], {
                x: margin + 100,
                y: yPos,
                size: 12,
                font: helveticaFont,
                color: grayColor,
            });
        });

        const guestDetails = [
            ['Name:', paymentDetails.user.name],
            ['Email:', paymentDetails.user.email],
        ];

        guestDetails.forEach((detail, index) => {
            const yPos = detailsY - 30 - (index * 25);
            page.drawText(detail[0], {
                x: margin * 2 + columnWidth,
                y: yPos,
                size: 12,
                font: helveticaFont,
                color: grayColor,
            });
            page.drawText(detail[1], {
                x: margin * 2 + columnWidth + 40,
                y: yPos,
                size: 12,
                font: helveticaFont,
                color: grayColor,
            });
        });

        const priceY = detailsY - 180;
        page.drawRectangle({
            x: margin - 20,
            y: priceY - 230,
            width: width - (margin - 20) * 2,
            height: 250,
            color: bgGreenColor,
            borderColor: rgb(0.8, 0.9, 0.8),
            borderWidth: 1,
            opacity: 0.5,
            borderOpacity: 0.2,
        });

        page.drawText('Price Details', {
            x: margin,
            y: priceY,
            size: 18,
            font: helveticaBold,
            color: greenColor,
        });

        const nights = (paymentDetails.checkOut - paymentDetails.checkIn) / (1000 * 60 * 60 * 24);
        const pricePerNight = paymentDetails.pricePerNight;
        const pricePerGuests = pricePerNight * nights;
        const totalBeforeFees = paymentDetails.guests * pricePerGuests;

        const priceDetails = [
            ['Price per night:', `$${pricePerNight}`],
            ['Nights:', `X ${nights}`],
            ['Price per guests:', `$${pricePerGuests}`],
            ['Guests:', `X ${paymentDetails.guests}`],
            ['Total:', `$${totalBeforeFees}`],
            ['Cleaning fee:', '$17.50'],
            ['Service fee:', '$51.31'],
            ['Grand Total:', `$${paymentDetails.amount}`],
        ];

        priceDetails.forEach((detail, index) => {
            const yPos = priceY - 30 - (index * 25);
            const isTotal = index === priceDetails.length - 1;

            page.drawText(detail[0], {
                x: margin,
                y: yPos,
                size: 12,
                font: isTotal ? helveticaBold : helveticaFont,
                color: grayColor,
            });

            const valueWidth = helveticaFont.widthOfTextAtSize(detail[1], 12);
            page.drawText(detail[1], {
                x: width - margin - valueWidth,
                y: yPos,
                size: 12,
                font: isTotal ? helveticaBold : helveticaFont,
                color: grayColor,
            });

            if (isTotal) {
                page.drawLine({
                    start: { x: margin, y: yPos + 10 },
                    end: { x: width - margin, y: yPos + 10 },
                    thickness: 1,
                    color: lightGrayColor,
                });
            }
        });

        const pdfBytes = await pdfDoc.save();

        const pdfBuffer=Buffer.from(pdfBytes);

        return {success:true, pdf:pdfBuffer, message:'Receipt generated successfully', email:session.user.email, payment: paymentDetails};
    } catch (error) {
        return { success: false, message: 'Error generating receipt' };
    }


}

export default generateReceiptPDF;