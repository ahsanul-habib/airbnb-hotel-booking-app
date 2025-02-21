import HotelCard from "@/app/components/HotelCard";
import Pagination from "@/app/components/Pagination";
import { getAllHotels } from "@/app/actions/guest/getAllHotels";
import NoHotelAvailable from "./components/NoHotelAvailable";
import NoHotelBySearch from "./components/NoHotelBySearch";

export default async function Home({ searchParams }) {
  const page = parseInt(searchParams?.page || 1);
  const searchQuery = searchParams?.searchQuery || "";
  const response = await getAllHotels(page, searchQuery);

  if (!response?.success) {
    return <div>{response?.message || "Failed to get hotel list"}</div>;
  }

  return (
    <main className="h-full flex flex-col flex-grow">
      {/* Hotel Listing Section */}
      <section className="flex-grow px-6 h-full flex flex-col justify-center items-center">
        {response.hotels.length === 0 && (searchQuery ? (
          <NoHotelBySearch />
        ) : (
          <NoHotelAvailable />
        ))}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {response?.hotels?.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))}
        </div>
      </section>

      <Pagination totalHotels={response.totalHotels} page={page} />

      <footer className="mt-12 text-sm text-zinc-500 max-w-7xl mx-auto py-4">
        <p>© 2024 Learn with Sumit • Terms • Privacy • Your Privacy Choices</p>
      </footer>
    </main>
  );
}
