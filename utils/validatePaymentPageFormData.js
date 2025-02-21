export default function validateFormData (formData){
    const currentDate = new Date();

    if (isNaN(formData.checkIn?.getTime()) || formData?.checkIn <= currentDate) {
      return "Check-In date must be a tomorrow or later.";
    }

    if (isNaN(formData.checkOut?.getTime()) || formData?.checkOut <= formData.checkIn) {
      return "Check-Out date must be after the Check-In date.";
    }

    if (isNaN(formData.guests) || formData.guests <= 0) {
      return "Number of guests must be greater than 0.";
    }

    if (!formData.cardNumber || formData.cardNumber.length != 16) {
      return "Card number must be 16 digits long. Your length is " + formData.cardNumber.length+".";
    }

    const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!formData.expiration || !expirationRegex.test(formData.expiration)) {
      return "Expiration date must be in the format MM/YY.";
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      return "CVV must be 3 digits long.";
    }

    if (!formData.streetAddress) {
      return "Street address is required.";
    }

    if (!formData.aptOrSuite) {
      return "Apt or suite number is required.";
    }

    if (!formData.city) {
      return "City is required.";
    }

    if (!formData.state) {
      return "State is required.";
    }

    if (!formData.zipCode) {
      return "ZIP code is required.";
    }

    return null;
  };