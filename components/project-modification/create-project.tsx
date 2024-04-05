"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Forward, X } from "lucide-react";
import UploadFile from "@/components/project-modification/uploadFile";
import { redirectToSignIn, useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useProjectsStore from "@/lib/projectStore";

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  projectType: z.string().min(1, {
    message: "please select project type",
  }),
  Requirements: z.string().min(30, {
    message: "Please list out all the Requirements About your project",
  }),
  Description: z.string().min(30, {
    message: "please explain you project briefly",
  }),
  Price: z
    .number()
    .min(5, {
      message: "Price must be a greater than 5$",
    })
    .max(1000000, {
      message: "Price cannot exceed $1,000,000.", // Adjust the maximum value as needed
    })
    .refine((value) => value !== undefined, {
      message: "Price is required.",
    }),
  fileUrl: z.array(z.string()),
});

const ProjectType = [
  "Full stack Web Development",
  "Fronted Development",
  "Backend Development",
  "UX / UI Web Design",
  "3D website development",
];
interface userProp {
  Id: string;
}
const CreateProject = ({ Id }: userProp) => {
  const { userId } = useAuth();
  const Router = useRouter();

  if (!userId && Id) {
    redirectToSignIn();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectType: "",
      Requirements: "",
      Description: "",
      Price: 0,
      fileUrl: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/CreateProject", values);
      form.reset();
      Router.push(`/dashboard/overview/${Id}`);
    } catch (error) {
      console.log("Error occurred while creating project", error);
    }
  };

  const isLoading = form.formState.isSubmitting;
  const { isUploading, setIsUploading } = useProjectsStore();

  return (
    <div className="relative mx-auto bg-[#ECEFFF] xl:h-screen max-h w-full p-8 overflow-hidden">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-4 rounded-lg flex justify-center items-center">
            <div className="w-32 h-4 bg-gray-300 rounded-full relative">
              <div className="h-full bg-green-500 rounded-full"></div>
            </div>
            <p className="ml-2">Loading...</p>
          </div>
        </div>
      )}
      <h1 className="flex gap-4 font-bold xl:text-6xl md:text-[45px] text-[30px] items-center text-center justify-center font-playfairDisplay">
        Lets build your ideas
        <Image src="/idea-generation.png" alt="idea" width={50} height={50} />
      </h1>
      <Form {...form}>
        <React.Fragment>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative space-y-8 h-full w-full grid xl:grid-cols-2 grid-cols-1"
          >
            <div className=" gap-8 mx-4 h-full col-span-1">
              <div className="h-[80%] flex flex-col p-8 items-center justify-between">
                <div className="space-y-8 px-9">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem className="mt-4 gap-4 flex flex-col justify-between">
                        <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold ml-4 font-poppins">
                          Project Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="Please enter your name"
                            {...field}
                            className="md:w-[500px] w-[350px]  h-[50px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus:outline-none overflow-hidden bg-white bg-opacity-40 p-4 "
                            style={{
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                              backdropFilter: "blur(10px)",
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem className="mt-4 gap-4 flex flex-col justify-between ">
                        <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold ml-4 font-poppins">
                          Project Type
                        </FormLabel>
                        <Select
                          disabled={isLoading}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger
                              className="md:w-[500px] w-[350px] h-[50px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus:outline-none overflow-hidden bg-white bg-opacity-40 p-4"
                              style={{
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(10px)",
                              }}
                            >
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ProjectType.map((project, i) => (
                              <SelectItem key={`${i}`} value={project}>
                                {project}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Price"
                    render={({ field }) => (
                      <FormItem className="mt-4 gap-4 flex flex-col justify-between">
                        <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold ml-4">
                          Price
                        </FormLabel>
                        <FormControl className="relative">
                          <div className="flex items-center relative">
                            <span className="absolute inset-y-0 left-4 z-10 flex items-center text-black">
                              $
                            </span>
                            <Input
                              disabled={isLoading}
                              type="number"
                              placeholder="0"
                              {...field}
                              className="md:w-[500px] w-[350px] h-[50px] pl-12 pr-4 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none overflow-hidden bg-white bg-opacity-40 rounded-xl"
                              style={{
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(10px)",
                                paddingLeft: "2.5rem",
                              }}
                              onChange={(e) => {
                                const inputValue = e.target.value.trim();
                                const value = parseFloat(inputValue);
                                if (!isNaN(value) && value >= 0) {
                                  field.onChange(value);
                                } else if (inputValue === "" || inputValue === "0") { 
                                  field.onChange(null);
                                }
                              }}
                              
                              onBlur={(e) => {
                                const value = parseFloat(e.target.value);
                                if (isNaN(value) || value < 0) {
                                  field.onChange(null);
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Requirements"
                    render={({ field }) => (
                      <FormItem className="mt-4 gap-4 flex flex-col justify-between">
                        <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold ml-4 font-poppins">
                          Project Requirements
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={isLoading}
                            placeholder="List project requirements (i.e duration , technologies etc...)"
                            {...field}
                            className="md:w-[500px] w-[350px] h-[150px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus:outline-none overflow-hidden bg-white bg-opacity-40 p-4 rounded-xl"
                            style={{
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                              backdropFilter: "blur(10px)",
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Description"
                    render={({ field }) => (
                      <FormItem className="mt-4 gap-4 flex flex-col justify-between">
                        <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold ml-4">
                          Project Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={isLoading}
                            placeholder="Tell me more about your project (i.e your vision ,style & purpose...)"
                            {...field}
                            className="md:w-[500px] w-[350px] h-[200px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus:outline-none overflow-hidden bg-white bg-opacity-40 p-4 rounded-xl"
                            style={{
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                              backdropFilter: "blur(10px)",
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 flex lg:items-start items-center">
              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem className="mt-4 gap-4 flex flex-col w-full">
                    <FormLabel className="text-center xl:text-2xl md:text-xl text-lg font-semibold font-poppins">
                      Upload Files
                    </FormLabel>
                    <FormControl>
                      <UploadFile
                        endPoint="Uploader"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative flex justify-center lg:w-screen w-full font-poppins">
              <div className="flex items-start justify-between lg:w-[80%] w-full gap-12 mb-32">
                <div className="flex items-center justify-center">
                  <Link href={`/dashboard/overview/${userId}`}>
                    <button
                      className="md:px-8 px-6 py-4 flex justify-between items-center gap-2 bg-rose-500 hover:bg-gradient-to-br font-bold md:text-lg text-sm text-black border-2 border-black hover:text-white hover:border-white hover:bg-black"
                      style={{ boxShadow: "5px 5px 0px rgba(0,0,0)" }}
                    >
                      <X />
                      Cancel
                    </button>
                  </Link>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className={`md:px-8 px-6 py-4 flex justify-between items-center gap-2 bg-green-500 hover:bg-gradient-to-br font-bold md:text-lg text-sm text-black border-2 border-black    ${isUploading ? "bg-zinc-400 cursor-not-allowed" : "hover:border-white hover:text-white hover:bg-black"}`}
                    style={{ boxShadow: "5px 5px 0px rgba(0,0,0)" }}
                    disabled={isUploading}
                  >
                    Next
                    <Forward />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </React.Fragment>
      </Form>
    </div>
  );
};

export default CreateProject;
