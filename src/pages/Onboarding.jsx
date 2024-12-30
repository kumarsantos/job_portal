/** @format */

import { useUser } from "@clerk/clerk-react";
import { Button } from "../components/ui/button";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleCandidate = async () => {
    await user
      .update({
        unsafeMetadata: { role: "candidate" },
      })
      .then(() => {
        navigate("/jobs");
      })
      .catch((error) => {
        console.log("Error updating role:", error);
      });
  };

  const handleRecruiter = async () => {
    await user
      .update({
        unsafeMetadata: { role: "recruiter" },
      })
      .then(() => {
        navigate("/post-job");
      })
      .catch((error) => {
        console.log("Error updating role:", error);
      });
  };

  useEffect(() => {
    if (user) {
      if (user?.unsafeMetadata?.role === "candidate") {
        navigate("/jobs");
      } else if (user?.unsafeMetadata?.role === "recruiter") {
        navigate("/post-job");
      }
    }
  }, [navigate, user]);


  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#367b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-24 text-2xl"
          onClick={handleCandidate}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-24 text-2xl"
          onClick={handleRecruiter}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
