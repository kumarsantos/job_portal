/* eslint-disable react-hooks/exhaustive-deps */
import { getMyJobs } from "@/api/apiApplication";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./JobCard";

const CreatedJobs = () => {
  const { isLoaded, user } = useUser();

  const {
    data: myJobs,
    loading: myJobsLoading,
    fn: fnMyJobs,
  } = useFetch(getMyJobs, { recruiter_id: user?.id });

  useEffect(() => {
    if (isLoaded) {
      fnMyJobs();
    }
  }, [isLoaded]);

  if (!isLoaded || myJobsLoading) {
    return <BarLoader className="mb-4" width={"100%"} color="#367b7" />;
  }
  return (
    <div className="min-h-screen">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myJobs?.map((item) => {
          return (
            <JobCard
              key={item.id}
              job={item}
              isSaved={item?.saved?.length > 0}
              isMyJob={true}
              onSave={fnMyJobs}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CreatedJobs;
