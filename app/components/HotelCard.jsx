import Link from 'next/link';
import Image from 'next/image';
import calculateRatings from '@/utils/calculateRatings';

export default function HotelCard({ hotel }) {
  return (
    <Link href={`/hotel/details/${hotel._id.toString()}`} className="block group">
      <div>
        <div className="relative">
          <Image
            src={hotel.images[0]}
            alt={hotel.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold">
            <i className="ph-bed inline-block mr-1"></i>
            {hotel.roomsAvailable} Rooms Left
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{hotel.title}</h3>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-zinc-600">{calculateRatings(hotel)}</span>
            </div>
          </div>
          <p className="text-zinc-500 text-sm mt-1">{hotel.location}</p>
          <div className="mt-2 flex justify-between items-center">
            <div>
              <span className="font-bold">${hotel.pricePerNight}</span>
              <span className="text-zinc-500 text-sm"> per night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}