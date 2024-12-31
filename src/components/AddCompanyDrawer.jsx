/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { addNewCompany } from "@/api/apiJobs";
import useFetch from "@/hooks/useFetch";
import { BarLoader } from "react-spinners";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpg"),
      { message: "Only PNG or JPG files are allowed" }
    ),
});

const AddCompanyDrawer = ({ fnCompanies }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      logo: "",
    },
  });

  const {
    data: newCompany,
    loading: loadingCreatingCompany,
    fn: fnCreateNewCompany,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    await fnCreateNewCompany(data);
  };

  useEffect(() => {
    if (newCompany?.length > 0) {
      fnCompanies();
      setIsOpen(false);
    }
  }, [loadingCreatingCompany]);

  return (
    <Drawer open={isOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          type="button"
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          Add Company
        </Button>
      </DrawerTrigger>
      {loadingCreatingCompany && <BarLoader width={"100%"} color="#367b7" />}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a New Company</DrawerTitle>
        </DrawerHeader>
        <form className="flex flex-col gap-4">
          <Input type="file" accept=".png, .jpg" {...register("logo")} />
          {errors?.logo && (
            <p className="text-red-500">{errors.logo.message}</p>
          )}
          <Input
            type="text"
            placeholder="Company Name"
            className="flex-1"
            {...register("name")}
          />
          {errors?.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}
          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full"
            variant="blue"
            type="button"
            disabled={loadingCreatingCompany}
          >
            Submit
          </Button>
        </form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
