export function validateBookingDates(checkIn, checkOut) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (checkIn <= today) {
      return {
        isValid: false,
        message: "Check-in date must be tomorrow or later.",
      };
    }
  
    if (checkOut <= checkIn) {
      return {
        isValid: false,
        message: "Check-out date must be after the check-in date.",
      };
    }
  
    return {
      isValid: true,
      message: "Dates are valid.",
    };
  }
  