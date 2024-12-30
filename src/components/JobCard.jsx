
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { HeartIcon, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { saveJob } from "../api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

const JobCard = ({
  job,
  isMyJob = false,
  isSaved = false,
  onSave = () => {},
  onUnsave = () => {},
  onClick = () => {},
}) => {
  const { user } = useUser();

  const [saved, setSaved] = useState(isSaved);
  const { data, loading, error, fn } = useFetch(saveJob, {
    already_saved: saved,
  });

  const handleSaveJob = async () => {
    await fn({ user_id: user.id, job_id: job?.id });
    onSave();
  };

  useEffect(() => {
    if (data !== undefined) {
      setSaved(data?.length > 0);
    }
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-bold">
          {job?.title}

          {isMyJob && (
            <Trash2Icon
              size={18}
              fill="red"
              onClick={onUnsave}
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-center">
          {job?.company && (
            <img
              src={job?.company?.logo_url}
              alt="company logo"
              className="h-4"
            />
          )}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} className="mr-2 text-gray-400" />
            {job?.location}
          </div>
        </div>
        <hr />
        {job?.description?.substring(0, 100)}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job?.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loading}
          >
            {saved ? (
              <HeartIcon
                size={24}
                stroke="red"
                fill="red"
                className="cursor-pointer"
              />
            ) : (
              <HeartIcon
                size={24}
                stroke="black"
                fill="white"
                className="cursor-pointer"
              />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
