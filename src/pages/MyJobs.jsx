/** @format */

import { useUser } from "@clerk/clerk-react";
import CreatedApplications from "@/components/CreatedApplications";
import CreatedJobs from "@/components/CreatedJobs";

const MyJobs = () => {
  const { isLoaded, user } = useUser();

  return (
    <div>
      <h1 className="gradient-title font-extrabold pb-8 text-5xl sm:text-7xl text-center">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default MyJobs;
