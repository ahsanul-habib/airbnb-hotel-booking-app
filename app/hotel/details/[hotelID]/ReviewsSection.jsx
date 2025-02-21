"use client";

import { FaStar } from "react-icons/fa";
import CreateReviewModal from "./CreateReviewModal";
import { useState } from "react";
import ReviewCarousel from "./ReviewCarousel";

const ReviewsSection = ({
  hotelID,
  ratingCount,
  ratings,
  userEmail,
  ownerEmail,
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  const alreadyReviewed = !!ratings.find(
    (rating) => rating.email === userEmail
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-12 border-t">
        {/* Reviews Header with Average Rating */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">Reviews</h2>
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mr-2" />
              <span className="text-xl font-semibold">{ratingCount}</span>
              <span className="mx-2">·</span>
              <span className="text-gray-600">{ratings.length} reviews</span>
            </div>
          </div>
          {userEmail
            ? userEmail === ownerEmail ||
              (alreadyReviewed ? (
                "Already Rated"
              ) : (
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-4 py-2 border border-gray-900 rounded-lg hover:bg-gray-100"
                >
                  Write a Review
                </button>
              ))
            : "Please login to write a review"}
        </div>
        {/* Reviews Grid */}
        <ReviewCarousel
          hotelID={hotelID}
          ratings={ratings}
          userEmail={userEmail}
        />
        {/* Show More Button */}
      </div>
      {isReviewModalOpen && (
        <CreateReviewModal
          hotelID={hotelID}
          onClose={() => setIsReviewModalOpen(false)}
        />
      )}
    </>
  );
};

export default ReviewsSection;
