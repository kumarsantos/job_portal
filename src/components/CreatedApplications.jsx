/** @format */

import { getApplications } from "@/api/apiApplication";
import App from "@/App";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";

const CreatedApplications = () => {
  const { isLoaded, user } = useUser();

  const {
    data: applications,
    loading: applicationsLoading,
    error: applicationsError,
    fn: fnApplications,
  } = useFetch(getApplications, { user_id: user?.id });

  useEffect(() => {
    if (isLoaded) {
      fnApplications();
    }
  }, [isLoaded]);

  if (!isLoaded || applicationsLoading) {
    return <BarLoader className="mb-4" width={"100%"} color="#367b7" />;
  }
  return (
    <div className="flex flex-col gap-4">
      {applications?.map((item) => {
        console.log(item);
        return <ApplicationCard key={item.id} app={item} isCandidate />;
      })}
    </div>
  );
};

export default CreatedApplications;
