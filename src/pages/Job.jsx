/** @format */

import { useSession, useUser } from "@clerk/clerk-react";
import { getSingleJob, updateHiringStatus } from "../api/apiCompanies";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";

import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import ApplyJobs from "../components/ApplyJobs";

const Job = () => {
  const { session } = useSession();
  const { isLoaded } = useUser();
  const { id } = useParams();
  const { user } = useUser();

  const { data: singleJob, fn: fnJob } = useFetch(getSingleJob, { job_id: id });
  const {
    data: updatedJob,
    loading: loadingUpdatedJob,
    fn: fnUpdatedJob,
  } = useFetch(updateHiringStatus, {
    job_id: id,
  });

  useEffect(() => {
    if (session) {
      fnJob();
    }
  }, [session]);

  const handleStatusChange = async (value) => {
    const isOpen = value === "open";
    fnUpdatedJob({ isOpen }).then(() => fnJob());
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#367b7" />;
  }
  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl ">
          {singleJob?.title}
        </h1>
        <img
          src={singleJob?.company?.logo_url}
          className="h-12"
          alt={singleJob?.title}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {singleJob?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase />
          {singleJob?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {singleJob?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>
      {/* Hiring status */}
      {loadingUpdatedJob && (
        <BarLoader className="mb-4" width={"100%"} color="#367b7" />
      )}
      {singleJob?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${singleJob?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status" +
                (singleJob?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="close">Close</SelectItem>
          </SelectContent>
        </Select>
      )}
      <h2 className="text-2xl  font-bold">About the job</h2>
      <p className="sm:text-md ">{singleJob?.description}</p>
      <h2 className="text-2xl  font-bold">What we are looking for</h2>
      <MDEditor.Markdown
        source={singleJob?.requirements}
        className="bg-transparent sm:text-lg"
      />

      {/* Render applications */}
      {singleJob?.recruiter_id !== user?.id && (
        <ApplyJobs
          user={user}
          job={singleJob}
          fetchJob={fnJob}
          applied={singleJob?.applications?.find(
            (app) => app?.candidate_id === user?.id
          )}
        />
      )}
    </div>
  );
};

export default Job;
