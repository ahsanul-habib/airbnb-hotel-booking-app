"use client";
import { FaSave } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { BsDoorOpen } from "react-icons/bs";
import { TbBed } from "react-icons/tb";
import EditBox from "../../components/EditBox";
import { useEffect, useState } from "react";
import InputBox from "../../components/InputBox";
import validateFormData from "@/utils/validateFormData";
import { toast } from "keep-react";
import { useRouter } from "next/navigation";
import { getHotelDetails } from "@/app/actions/guest/getHotelDetails";
import HotelUpdateLoadingPage from "./loading";
import Image from "next/image";
import { updateHotel } from "@/app/actions/owner/updateHotel";

const UpdatePage = ({ hotelID, userEmail }) => {
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    toast.promise(
      async () => {
        const response = await getHotelDetails(hotelID);
        if (!isMounted) return;
        if (response.success) {
          if (response.hotel.ownerEmail !== userEmail) {
            router.push(
              `/unauthorized?callback=${encodeURIComponent(
                `/hotel/update/${hotelID}`
              )}`
            );
            return;
          }
          setFormData({
            description: response.hotel.description,
            title: response.hotel.title,
            location: response.hotel.location,
            images: [...response.hotel.images],
            pricePerNight: response.hotel.pricePerNight,
            roomsAvailable: response.hotel.roomsAvailable,
            numberOfGuests: response.hotel.numberOfGuests,
            numberOfBedrooms: response.hotel.numberOfBedrooms,
            numberOfBeds: response.hotel.numberOfBeds,
            amenities: {
              beachAccess: response.hotel.amenities.beachAccess,
              privatePool: response.hotel.amenities.privatePool,
              freeWiFi: response.hotel.amenities.freeWiFi,
              kitchen: response.hotel.amenities.kitchen,
              freeParking: response.hotel.amenities.freeParking,
              fitnessCenter: response.hotel.amenities.fitnessCenter,
            },
          });
          return response;
        } else {
          throw new Error(response.error);
        }
      },
      {
        loading: "Fetching hotel info...",
        success: (data) => `Successfully fetched.Happy editing!`,
        error: (error) => {
          console.log(error);
          return `Updating hotel info failed: ${error}`;
        },
      }
    );

    return () => {
      isMounted = false;
    };
  }, [hotelID, router, userEmail]);

  const handleInputValueChange = (name, value) => {
    setFormData({
      ...formData,
      amenities: { ...formData.amenities, [name]: value },
    });
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageNumberChange = (index, value) => {
    setFormData({
      ...formData,
      amenities: { ...formData.amenities },
      images: [
        ...formData.images.slice(0, index),
        value,
        ...formData.images.slice(index + 1),
      ],
    });
  };

  const handleSubmit = async () => {
    const validation = validateFormData(formData);
    if (validation.isValid) {
      toast.promise(
        async () => {
          const response = await updateHotel(hotelID, formData);
          if (response.success) {
            router.push(`/hotel/details/${hotelID}`);
            return response;
          } else {
            throw new Error(response.error);
          }
        },
        {
          loading: "Updating your hotel...",
          success: (data) => `Your hotel has been updated successfully!`,
          error: (error) => {
            console.log(error);
            return `Updating hotel failed: ${error}`;
          },
        }
      );
    } else toast.error(validation.message);
  };

  if (!formData) return <HotelUpdateLoadingPage />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 relative">
      <button
        onClick={handleSubmit}
        className="flex flex-row items-center px-4 py-2 bg-accent text-white rounded-lg hover:brightness-90 absolute top-4 right-4"
      >
        <FaSave className="fas fa-save mr-2" />
        Update
      </button>
      {/* Property Title and Rating */}
      <div className="mb-6">
        <EditBox
          size="medium"
          label="Property Name"
          value={formData.title}
          onDone={(value) => handleChange("title", value)}
        />
        <EditBox
          value={formData.location}
          label="Property Location"
          onDone={(value) => handleChange("location", value)}
        />
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
        <div className="col-span-2 row-span-2 relative">
          <Image
            src="https://fakeimg.pl/500x500/009688/ffffff?text=airbnb"
            width={500}
            height={500}
            alt="Main Room"
            className="w-full h-full object-cover rounded-lg"
          />
          <input
            type="text"
            value={formData.images[0]}
            onChange={(e) => handleImageNumberChange(0, e.target.value)}
            placeholder="Enter image URL"
            className="w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
          />
        </div>
        <div className="relative">
          <Image
            src="https://fakeimg.pl/250x250/009688/ffffff?text=airbnb"
            width={250}
            height={250}
            alt="Room 1"
            className="w-full h-full object-cover rounded-lg"
          />
          <input
            type="text"
            value={formData.images[1]}
            onChange={(e) => handleImageNumberChange(1, e.target.value)}
            placeholder="Enter image URL"
            className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
          />
        </div>
        <div className="relative">
          <Image
            src="https://fakeimg.pl/250x250/009688/ffffff?text=airbnb"
            width={250}
            height={250}
            alt="Room 2"
            className="w-full h-full object-cover rounded-lg"
          />
          <input
            type="text"
            value={formData.images[2]}
            width={250}
            height={250}
            onChange={(e) => handleImageNumberChange(2, e.target.value)}
            placeholder="Enter image URL"
            className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
          />
        </div>
        <div className="relative">
          <Image
            src="https://fakeimg.pl/250x250/009688/ffffff?text=airbnb"
            width={250}
            height={250}
            alt="Room 3"
            className="w-full h-full object-cover rounded-lg"
          />
          <input
            type="text"
            value={formData.images[3]}
            onChange={(e) => handleImageNumberChange(3, e.target.value)}
            placeholder="Enter image URL"
            className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
          />
        </div>
        <div className="relative">
          <Image
            src="https://fakeimg.pl/250x250/009688/ffffff?text=airbnb"
            width={250}
            height={250}
            alt="Room 4"
            className="w-full h-full object-cover rounded-lg"
          />
          <input
            type="text"
            value={formData.images[4]}
            onChange={(e) => handleImageNumberChange(4, e.target.value)}
            placeholder="Enter image URL"
            className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
          />
        </div>
      </div>
      <div className="mb-4 flex flex-row gap-2">
        <span className="text-xl font-bold edit">Price in USD</span>
        <div>
          <EditBox
            label="X"
            type="number"
            value={formData.pricePerNight}
            onDone={(value) => handleChange("pricePerNight", value)}
          />
        </div>
        <span className="text-gray-600 ml-1">$ per night</span>
      </div>
      <div className="mb-4">
        {/* Stock */}
        <span className="edit flex flex-row items-center gap-2 h-full">
          Available{" "}
          <EditBox
            label="X"
            value={formData.roomsAvailable}
            type="number"
            onDone={(value) => handleChange("roomsAvailable", value)}
          />{" "}
          rooms
        </span>
      </div>
      {/* Property Details */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column: Property Description */}
        <div className="col-span-2">
          <div className="border-b pb-6 mb-6">
            <div className="grid grid-cols-1 gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <GoPeople className="text-2xl" />
                <span className="edit">How many Guest can Stay?</span>
                <EditBox
                  size="small"
                  label="X"
                  value={formData.numberOfGuests}
                  type="number"
                  onDone={(value) => handleChange("numberOfGuests", value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <BsDoorOpen className="text-2xl" />
                <span className="edit">How many Bedrooms ? </span>
                <EditBox
                  size="small"
                  type="number"
                  label="X"
                  value={formData.numberOfBedrooms}
                  onDone={(value) => handleChange("numberOfBedrooms", value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <TbBed className="text-2xl" />
                <span className="edit">How many beds available ?</span>
                <EditBox
                  size="small"
                  label="X"
                  type="number"
                  value={formData.numberOfBeds}
                  onDone={(value) => handleChange("numberOfBeds", value)}
                />
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">About this place</h3>
            <EditBox
              label="Write a short description about this place"
              size="medium"
              value={formData.description}
              onDone={(value) => handleChange("description", value)}
            />
          </div>
          {/* Amenities */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              What this place offers
            </h3>
            <div className="grid grid-cols-2 gap-4" id="amenities">
              <InputBox
                label="Beach Access"
                value={formData.amenities.beachAccess}
                onValueChange={(value) =>
                  handleInputValueChange("beachAccess", value)
                }
              />
              <InputBox
                label="Private Pool"
                value={formData.amenities.privatePool}
                onValueChange={(value) =>
                  handleInputValueChange("privatePool", value)
                }
              />
              <InputBox
                label="Free Wi-Fi"
                value={formData.amenities.freeWiFi}
                onValueChange={(value) =>
                  handleInputValueChange("freeWiFi", value)
                }
              />
              <InputBox
                label="Kitchen"
                value={formData.amenities.kitchen}
                onValueChange={(value) =>
                  handleInputValueChange("kitchen", value)
                }
              />
              <InputBox
                label="Free Parking"
                value={formData.amenities.freeParking}
                onValueChange={(value) =>
                  handleInputValueChange("freeParking", value)
                }
              />
              <InputBox
                label="Fitness Center"
                value={formData.amenities.fitnessCenter}
                onValueChange={(value) =>
                  handleInputValueChange("fitnessCenter", value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
