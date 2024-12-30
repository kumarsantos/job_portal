/** @format */

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import { updateApplications } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ApplicationCard = ({ app, isCandidate = false }) => {
  const {
    data: updatedJob,
    loading: loadingHiringStatus,
    fn: fnUpdatedJob,
  } = useFetch(updateApplications, {
    job_id: app?.job_id,
  });

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = app?.resume;
    link.target = "_blank";
    link.click();
  };
  console.log({ app });

  const handleStatusChange = async (status) => {
    fnUpdatedJob(status);
  };

  return (
    <Card>
      {loadingHiringStatus && <BarLoader width={"100%"} color="#367b7" />}
      <CardHeader>
        <CardTitle className="flex justify-between items-center font-bold">
          {isCandidate
            ? `${app?.job?.title} at ${app?.job?.comany?.name}`
            : app?.name}
          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={15} /> Experience: {app?.experience} years
            of experience
          </div>
          <div className="flex items-center gap-2">
            <School size={15} /> Education: {app?.education}
          </div>
          <div className="flex items-center gap-2">
            <Boxes size={15} /> Skills: {app?.skills}
          </div>
        </div>
        <hr />
        <CardFooter className="flex justify-between items-center">
          <span>{new Date(app?.created_at).toLocaleDateString()}</span>
          {isCandidate ? (
            <span className="capitalize font-bold">Status: {app?.status}</span>
          ) : (
            <Select
              onValueChange={handleStatusChange}
              defaultValue={app?.status}
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Application Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
