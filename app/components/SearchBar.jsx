"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { IoSearchOutline } from "react-icons/io5"

const SearchBar = () => {
    const router=useRouter();
    const searchParams=useSearchParams();
    const searchQuery=searchParams.get('searchQuery')||"";
    const handleSearch=(formData)=>{
        const searchQuery=formData.get('searchQuery');
        if(!searchQuery?.trim()){
            router.push('/');
            return;
        }
        router.push(`/?searchQuery=${searchQuery}`);
    }

  return (
        <form action={handleSearch}>
      <div className="row-start-2 col-span-2 border-0 md:border flex shadow-sm hover:shadow-md transition-all md:rounded-full items-center px-2">
        <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4 divide-x py-2 md:px-2 flex-grow">
          <input
            type="text"
            name="searchQuery"
            defaultValue={searchQuery}
            placeholder="Where to?"
            className="px-3 bg-transparent focus:outline-none lg:col-span-3 placeholder:text-sm"
          />
        </div>
        <button type="submit" className="bg-accent w-7 h-7 rounded-full grid place-items-center text-sm text-center transition-all hover:brightness-90 shrink-0">
        <IoSearchOutline className="text-xl font-extrabold text-white"/>
        </button>
      </div>
        </form>
  )
}

const Wrapper=()=>{
    return (
      <Suspense>
        <SearchBar />
      </Suspense>
    )
}


export default Wrapper;