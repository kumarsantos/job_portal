/** @format */

import { getJobs } from "../api/apiJobs";
import { useEffect, useState } from "react";
import useFetchJobs from "../hooks/useFetch";
import { BarLoader } from "react-spinners";
import JobCard from "../components/JobCard";
import { useSession } from "@clerk/clerk-react";
import { getCompanies } from "../api/apiCompanies";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "../components/ui/select";
import { State } from "country-state-city";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { session } = useSession();

  const {
    data: jobs,
    loading: jobsLoading,
    error: jobsError,
    fn: fnJobs,
  } = useFetchJobs(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { data: companies, fn: fnCompanies } = useFetchJobs(getCompanies);

  useEffect(() => {
    if (session) {
      fnCompanies();
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fnJobs();
    }
  }, [session, location, company_id, searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) {
      setSearchQuery(query);
    }
  };

  const clearFilters = () => {
    setCompany_id("");
    setLocation("");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      {/* add filter */}
      <form
        onSubmit={handleSearch}
        className="h-10 flex w-full gap-2 items-center mb-2"
      >
        <Input
          type="text"
          placeholder="Search jobs"
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button variant="blue" type="submit" className="h-full sm:w-28">
          Search
        </Button>
      </form>
      <div className="flex gap-2 flex-col sm:flex-row">
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent>
            {companies?.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State?.getStatesOfCountry("IN")?.map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={clearFilters}
          variant="destructive"
          className="sm:w-1/2"
        >
          Clear Filters
        </Button>
      </div>
      {jobsLoading && (
        <BarLoader className="mb-4" width={"100%"} color="#367b7" />
      )}
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs?.map((job) => {
          return (
            <JobCard key={job.id} job={job} isSaved={job?.saved?.length > 0} />
          );
        })}
      </div>
        {!jobsLoading && !jobs?.length && <div className="text-center w-full">No Jobs Found</div>}
    </div>
  );
};

export default JobListing;
