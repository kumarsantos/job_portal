/** @format */

import { useSession } from "@clerk/clerk-react";
import { getSingleJob } from "../api/apiCompanies";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const MyJobs = () => {
  const { session } = useSession();
  const { id } = useParams();
  console.log(id)

  const { data: singleJob, fn: fnJob } = useFetch(getSingleJob, { job_id: id });

  useEffect(() => {
    if (session) {
      fnJob();
    }
  }, [session]);

  console.log(singleJob);

  return <div>MyJobs</div>;
};

export default MyJobs;
