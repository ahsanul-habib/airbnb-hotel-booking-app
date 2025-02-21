export default function validateFormData(formData) {
    if (!formData?.title?.trim()) {
      return { isValid: false, message: "Property name is required." };
    }
  
    if (!formData?.description?.trim()) {
      return { isValid: false, message: "Description is required." };
    }
  
    if (!formData?.location?.trim()) {
      return { isValid: false, message: "Location is required." };
    }
  
    if (!formData?.pricePerNight || typeof formData.pricePerNight !== "number" || formData.pricePerNight <= 0) {
      return { isValid: false, message: "Price per night must be a positive number." };
    }
  
    if (!formData?.roomsAvailable || typeof formData.roomsAvailable !== "number" || formData.roomsAvailable <= 0) {
      return { isValid: false, message: "Rooms available must be a positive number." };
    }
  
    if (!formData?.numberOfGuests || typeof formData.numberOfGuests !== "number" || formData.numberOfGuests <= 0) {
      return { isValid: false, message: "Number of guests must be a positive number." };
    }
  
    if (!formData?.numberOfBedrooms || typeof formData.numberOfBedrooms !== "number" || formData.numberOfBedrooms <= 0) {
      return { isValid: false, message: "Number of bedrooms must be a positive number." };
    }
  
    if (!formData?.numberOfBeds || typeof formData.numberOfBeds !== "number" || formData.numberOfBeds <= 0) {
      return { isValid: false, message: "Number of beds must be a positive number." };
    }
  
    if (!formData?.amenities || typeof formData.amenities !== "object") {
      return { isValid: false, message: "Amenities must be a valid object." };
    }
  
    const amenitiesValidation = validateAmenities(formData.amenities);
    if (!amenitiesValidation.isValid) {
      return amenitiesValidation;
    }
  
    if (!validateImages(formData.images)) {
      return { isValid: false, message: "All images are required." };
    }

  
    return { isValid: true, message: "Validation passed." };
  }
  
  function validateAmenities(amenities) {
    const requiredAmenities = ["beachAccess", "privatePool", "freeWiFi", "kitchen", "freeParking", "fitnessCenter"];
    
    for (const amenity of requiredAmenities) {
      if (typeof amenities[amenity] !== "boolean") {
        return { isValid: false, message: `${amenity} must be a boolean value.` };
      }
    }
  
    return { isValid: true, message: "Amenities validation passed." };
  }
  
  function validateImages(images) {
    if (!Array.isArray(images) || images.length !== 5 || images.some(image => typeof image !== "string" || image.length === 0)) {
      return false;
    }
  
    return images.every(image => image && image.trim() !== "");
  }