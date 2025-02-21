"use client"

import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import submitReview from "@/app/actions/guest/submitReview";
import { toast } from "keep-react";
import { usePathname, useRouter } from "next/navigation";

const CreateReviewModal = ({hotelID,onClose}) => {
    const [formData,setFormData]=useState({rating:0,description:""});
    const pathName=usePathname();
    const router=useRouter();

    const handleSubmitReview=async()=>{
        toast.promise(
            async () => {
              const response = await submitReview({...formData,hotelID});
              
              if (response.success) {
                  onClose();
                  router.refresh();
                  return response;
              } else {
                if(response.message==="User not authenticated"){
                    router.push(`/login?callback=${encodeURIComponent(pathName)}`);
                    throw new Error("Please login to submit a review");
                }
                throw new Error(response.message || "An unexpected error occured!");
              }
            },
            {
              loading: "Submitting review...",
              success: (response) => `Review successfully submitted!`,
              error: (error) => {
                console.log(error);
                return `Review submission failed: ${error || "An error occurred"}`;
              },
            }
          );
        }

  return (
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" id="reviewModal">
  <div className="bg-white rounded-2xl w-full max-w-xl mx-4 overflow-hidden">
    {/* Modal Header */}
    <div className="border-b p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Write a review</h3>
        <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
          <RiCloseFill className="fas fa-times text-xl" />
        </button>
      </div>
    </div>
    {/* Modal Body */}
    <div className="p-6">
      <form className="space-y-6">
        {/* Overall Rating */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Overall Rating</label>
          <div className="flex gap-2">
            {
                [1,2,3,4,5].map(starIndex=>(
            <button key={starIndex} onClick={()=>setFormData({...formData,rating:starIndex})} type="button" className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500">
                {formData.rating>=starIndex?(
              <FaStar className="text-yellow-500" />
                ):(
                    <FaRegStar/>
                )
}
            </button>
                ))
            }
          </div>
        </div>
        {/* Review Text */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Your Review</label>
          <textarea value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})} required={true} rows={4} placeholder="Share your experience with other travelers..." className="w-full px-4 py-3 rounded-lg border focus:border-gray-500 focus:ring-0 resize-none" defaultValue={""} />
        </div>
      </form>
    </div>
    {/* Modal Footer */}
    <div className="border-t p-4 bg-gray-50">
      <div className="flex justify-end gap-4">
        <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-300 rounded-lg">
          Cancel
        </button>
        <button onClick={handleSubmitReview} className="px-4 py-2 bg-accent text-white rounded-lg hover:brightness-90">
          Submit Review
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default CreateReviewModal