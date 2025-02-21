"use client"

import { Suspense } from "react";
import Loading from "../loading";
import ErrorPage from "./ErrorPage";


const ErrorPageWrapper = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorPage />
    </Suspense>
  );
};

export default ErrorPageWrapper;
