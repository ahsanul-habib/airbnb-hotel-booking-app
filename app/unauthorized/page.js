"use client";
import { useSearchParams } from "next/navigation";
import UnauthorizedSVG from "./UnauthorizedSVG";
import Link from "next/link";
import { Suspense } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
  return (
    <div className="flex flex-col items-center justify-center w-screen h-full gap-4 py-8 ">
      <UnauthorizedSVG />
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-medium text-center">
          You are not authorized
        </h1>
        <p className="text-xl text-center ">
          You tried to access a page you did not have prior authorization for.
          <br /> Please{" "}
          <Link
            href={`/login${callback ? `/${encodeURIComponent(callback)}` : ""}`}
            className="text-accent"
          >
            login
          </Link>{" "}
          again with your actual credentials.
          <br /> If you believe this is a mistake, please contact the system
          administrator.
        </p>
      </div>
    </div>
  );
};

const UnauthorizedWrapper = () => {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
};

export default UnauthorizedWrapper;
