"use client"

import { deleteHotel } from "@/app/actions/owner/deleteHotel";
import { toast } from "keep-react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import HotelDeleteModal from "./DeleteModal";
import { usePathname, useRouter } from "next/navigation";

const DeleteButton = ({hotelID,hotelName}) => {
  const [isDeleteModalOpen,setIsDeleteModalOpen]=useState(false);
  const pathname=usePathname();
  const router=useRouter();

    const handleDelete=async()=>{
      setIsDeleteModalOpen(false);
        toast.promise(
          async () => {
            const response = await deleteHotel(hotelID);
            if (response.success) {
              return response.message;
            } else {
              if(response.message==="Unauthorized. Please log in."){
                router.push(`/login?callback=${encodeURIComponent(pathname)}`);
                throw new Error("Please login to delete a hotel");
              }
              else throw new Error(response.message);
            }
          },
          {
            loading: "Deleting hotel...",
            success: (data) => data,
            error: (error) => {
              console.log(error);
              return `Hotel deleting failed: ${error}`;
            },
          }
        );
      }
  return (
    <>
    <button onClick={()=>setIsDeleteModalOpen(true)} className="text-red-500 hover:text-red-600">
    <MdDeleteForever className="text-2xl"/>
  </button>
  {
    isDeleteModalOpen && <HotelDeleteModal hotelID={hotelID} hotelName={hotelName} onClose={()=>setIsDeleteModalOpen(false)} handleDelete={handleDelete}/>
  }
    </>
  )
}

export default DeleteButton