import { getHotelDetails } from "@/app/actions/guest/getHotelDetails";
import ReservePage from "./ReservePage";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import HotelOwnerRestriction from "./HotelOwnerRestricted";

const ReservePageWrapper = async({params:{hotelID},searchParams}) => {
  const {checkIn,checkOut,guests}=searchParams;

  const session=await auth();

  if(!session?.user?.email){
    redirect(`/login?callback=${encodeURIComponent(`/hotel/payment/${hotelID}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)}`);
    return null;
  }

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;

  if (checkInDate) checkInDate.setHours(0, 0, 0, 0);
  if (checkOutDate) checkOutDate.setHours(0, 0, 0, 0);

  if (
    !isValidDate(checkInDate) ||
    !isValidDate(checkOutDate) ||
    checkOutDate <= checkInDate ||
    isNaN(guests) ||
    guests <= 0
  ) {
    redirect(`/hotel/details/${hotelID}`);
    return null;
  }

  const response=await getHotelDetails(hotelID);

  if(!response || !response.success){
    return (<div>Hotel not found</div>)
  }

  if(response.hotel.ownerEmail===session?.user?.email){
    return (<HotelOwnerRestriction/>);
  }

  return (
    <ReservePage hotel={response.hotel} checkIn={checkInDate} checkOut={checkOutDate} guests={parseInt(guests)}/>
  )
}

export default ReservePageWrapper;