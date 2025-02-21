import deleteRating from "@/app/actions/guest/deleteRating";
import { toast } from "keep-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaRegStar,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import DeleteConfirmPopup from "./DeleteConfirmPopup";

const ReviewCarousel = ({ ratings, userEmail, hotelID }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const router = useRouter();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ratings.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ratings.length - 1 : prevIndex - 1
    );
  };

  const handleDelete = () => {
    setDeleteModalOpen(false);
    toast.promise(
      async () => {
        const response = await deleteRating(hotelID);
        if (response.isSuccess) {
          router.refresh();
          return response;
        } else {
          throw new Error(response.error);
        }
      },
      {
        loading: "Deleting comment...",
        success: (data) => `Your comment has been deleted successfully!`,
        error: (error) => {
          console.log(error);
          return `Deleting comment failed: ${error}`;
        },
      }
    );
  };

  if (ratings.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center text-gray-500">
        No reviews available
      </div>
    );
  }

  const currentReview = ratings[currentIndex];

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl relative">
        {userEmail === currentReview.email && (
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
            aria-label="Delete Review"
          >
            <FaTrash className="text-xl" />
          </button>
        )}

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <Image
              width={96}
              height={96}
              src={currentReview.image}
              alt={currentReview.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
            <FaQuoteLeft className="absolute -top-2 -left-2 text-blue-500 text-3xl opacity-50" />
          </div>

          <p className="text-gray-600 italic mb-4 text-lg">
            {currentReview.description}
          </p>

          <div className="mb-4">
            <h3 className="font-bold text-xl text-gray-800">
              {currentReview.name}
            </h3>
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <button
                key={starIndex}
                type="button"
                className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
              >
                {currentReview.rating >= starIndex ? (
                  <FaStar className="text-yellow-500" />
                ) : (
                  <FaRegStar />
                )}
              </button>
            ))}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handlePrev}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
              disabled={ratings.length <= 1}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
              disabled={ratings.length <= 1}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
      {deleteModalOpen && (
        <DeleteConfirmPopup
          handleDelete={handleDelete}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

export default ReviewCarousel;
