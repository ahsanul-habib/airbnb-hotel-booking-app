import { getHotelDetails } from "@/app/actions/guest/getHotelDetails";

export default async function generateMetadata({ params }) {
  const hotelID = params.hotelID;
  const response = await getHotelDetails(hotelID);

  if (!response.success) {
    return {
      title: "Hotel Not Found",
      description: `We couldn't find the hotel with ID ${hotelID}.`,
    };
  }

  const hotel = response.hotel;

  return {
    title: `${hotel.title} - ${hotel.location}`,
    description: `${hotel.description.slice(0, 150)}...`,
    openGraph: {
      title: `${hotel.title} - ${hotel.location}`,
      description: `${hotel.description.slice(0, 150)}...`,
      images: hotel.images.map((image) => ({
        url: image,
        width: 800,
        height: 600,
        alt: `${hotel.title} Image`,
      })),
    },
  };
}
