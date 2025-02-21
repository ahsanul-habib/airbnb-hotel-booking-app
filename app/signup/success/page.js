"use client"
import TickSVG from "./TickSVG"

const Page = () => {

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 md:px-6 py-12 md:py-24 lg:py-32">
    <div className="max-w-md text-center space-y-4">
      <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 inline-flex">
        <TickSVG className="h-8 w-8 text-green-500 dark:text-green-400" />
      </div>
      <h1 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">SignUp Successful</h1>
      <p className="text-gray-500 dark:text-gray-400 md:text-xl">
        Your account has been created successfully. Please seat back tight while we are redirecting for you!
      </p>
    </div>
  </div>
  )
}

export default Page