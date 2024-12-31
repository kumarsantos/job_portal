/* eslint-disable react-hooks/exhaustive-deps */
import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import  { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    data: jobs,
    loading: jobsLoading,
    fn: fnJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded]);

  if (!isLoaded || jobsLoading) {
    return <BarLoader className="mb-4" width={"100%"} color="#367b7" />;
  }

  return (
    <div className="min-h-screen">
      <h1 className="gradient-title font-extrabold pb-8 text-5xl sm:text-7xl text-center">
        Saved Jobs
      </h1>

      {!jobsLoading && !jobs?.length && <div>No saved jobs</div>}
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs?.map(({ job, id }) => {
          return <JobCard key={id} job={job} isSaved={true} onSave={fnJobs} />;
        })}
      </div>
    </div>
  );
};

export default SavedJobs;
