const calculateRatings = (hotel) => {
  return hotel?.ratings?.length > 0
    ? (
        hotel.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
        hotel.ratings.length
      ).toFixed(1)
    : "Not rated yet";
};

export default calculateRatings;
