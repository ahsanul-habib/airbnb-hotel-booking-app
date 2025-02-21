export function transformFormDataToNumbers(formData) {
  const newFormData = { ...formData };

  newFormData.pricePerNight = Number(formData.pricePerNight);
  newFormData.roomsAvailable = Number(formData.roomsAvailable);
  newFormData.numberOfGuests = Number(formData.numberOfGuests);
  newFormData.numberOfBedrooms = Number(formData.numberOfBedrooms);
  newFormData.numberOfBeds = Number(formData.numberOfBeds);

  return newFormData;
}
