import { useUser } from "@clerk/clerk-react";
import CreatedApplications from "@/components/CreatedApplications";
import CreatedJobs from "@/components/CreatedJobs";
import { BarLoader } from "react-spinners";

const MyJobs = () => {
  const { isLoaded, user } = useUser();
  if(!isLoaded){
    return <BarLoader width={'100%'} color="#036FCB" />
  }
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
