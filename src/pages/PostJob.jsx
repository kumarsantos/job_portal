import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";
import { useSession, useUser } from "@clerk/clerk-react";
import useFetch from "@/hooks/useFetch";
import { getCompanies } from "@/api/apiCompanies";
import { Navigate, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { addNewJob } from "@/api/apiApplication";
import AddCompanyDrawer from "@/components/AddCompanyDrawer";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
  location: z.string().min(1, { message: "Location is required" }),
  company_id: z.string().min(1, { message: "Company is required" }),
});

const PostJob = () => {
  const { session } = useSession();
  const { user } = useUser();
  const navigate = useNavigate();
  // addNewJob
  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      location: "",
      company_id: "",
    },
  });

  const { data: companies, fn: fnCompanies } = useFetch(getCompanies);
  const {
    data: newJob,
    loading: loadingCreatingJob,
    fn: fnCreateNewJob,
  } = useFetch(addNewJob);

  const onSubmit = async (data) => {
    await fnCreateNewJob({ ...data, recruiter_id: user.id });
  };

  useEffect(() => {
    if (session) {
      fnCompanies();
    }
  }, [session]);

  useEffect(() => {
    if (newJob?.length > 0) {
      navigate("/jobs");
    }
  }, [loadingCreatingJob, navigate, newJob]);

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="min-h-screen">
      <h1 className="gradient-title font-extrabold pb-8 text-5xl sm:text-7xl text-center">
        Post a Job
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input placeholder="Job Title" {...register("title")} />
        {errors?.title && (
          <p className="text-red-500">{errors.title.message}</p>
        )}
        <Textarea
          placeholder="Job Description"
          rows={10}
          className="resize-none"
          {...register("description")}
        />
        {errors?.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <div className="flex gap-4 items-center">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={field.onChange}
                value={field.value}
              >
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
            )}
          />
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a company">
                    {field.value
                      ? companies?.find((com) => com.id === Number(field.value))
                          ?.name
                      : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {companies?.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {/* Add Company drawer */}
          <AddCompanyDrawer fnCompanies={fnCompanies} /> 
        </div>
        {errors?.location && (
          <p className="text-red-500">{errors?.location?.message}</p>
        )}
        {errors?.company_id && (
          <p className="text-red-500">{errors?.company_id?.message}</p>
        )}
        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor
              {...field}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors?.requirements && (
          <p className="text-red-500">{errors?.requirements?.message}</p>
        )}
        <Button
          disabled={loadingCreatingJob}
          type="submit"
          variant="blue"
          size="lg"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
