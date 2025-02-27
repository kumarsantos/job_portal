/* eslint-disable react-hooks/exhaustive-deps */
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";

const CreatedApplications = () => {
  const { isLoaded, user } = useUser();

  const {
    data: applications,
    loading: applicationsLoading,
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
        return <ApplicationCard key={item.id} app={item} isCandidate />;
      })}
      {!applicationsLoading && !applications?.length && (
        <div className="flex justify-center items-center text-center w-full min-h-[400px]">No Applications Found</div>
      )}
    </div>
  );
};

export default CreatedApplications;
