"use client";
import { IProject } from "@/lib/mongodb";
import React, { useEffect, useState } from "react";
import ProjectAccordion from "../custom-ui/ProjectAccordian";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import Dialogue from "../dashboard/Dialogue";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { CheckCheck, ShieldAlert } from "lucide-react";
import { ToastAction } from "../ui/toast";
import useProjectsStore from "@/lib/projectStore";
import { useAuth } from "@clerk/nextjs";
import UploadfileonCard from "../project-modification/UploadfileonCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface projectProps {
  project: IProject;
}

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

const ProjectEditCard = ({ project }: projectProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteState, setIsDeleteState] = useState(false);
  const [currentProject, setCurrentProject] = useState(project);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaying, setPaying] = useState(false);

  const Router = useRouter();

  const { toast } = useToast();
  const {
    _id,
    project_type,
    project_description,
    project_title,
    projectFiles,
    project_requirements,
    price,
    paid,
  } = project;
  const { fetchProjects } = useProjectsStore();
  const { userId } = useAuth();

  if (!project) {
    return <Skeleton count={4} />;
  }

  useEffect(() => {
    if (window.location.search.includes("success=true")) {
      toast({
        title: "Payment succeeded",
        description: "Checkout Billing page for order information",
        variant: "Good",
      });
      setTimeout(() => {
        Router.push(`/dashboard/projects/${userId}`);
      }, 4000);
    }
  }, [Router]);

  const ToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: currentProject.project_title,
      projectType: currentProject.project_type,
      Requirements: currentProject.project_requirements,
      Description: currentProject.project_description,
      Price: currentProject.price,
      fileUrl: currentProject.projectFiles,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      if (currentProject?._id || _id) {
        const response = await axios.patch(
          `/api/UserProjectUpdate/${currentProject._id || _id}`,
          values
        );
        setCurrentProject(response.data);
        setIsSubmitting(false);
        toast({
          title: "Project Saved Successfully",
          variant: "Good",
        });
        Router.refresh();
        fetchProjects();
        ToggleEdit();
      }
    } catch (error) {
      toast({
        title: "Oops something went wrong",
        variant: "destructive",
      });
    }
  };

  const Delete = async () => {
    try {
      setIsDeleting(true);
      if (isDeleteState) {
        if (currentProject._id || _id) {
          const response = await axios.delete(
            `/api/updateProject/${currentProject._id || _id}`
          );
          setCurrentProject(response?.data);
          setIsDeleteState(false);
          setIsDeleting(false);
          toast({
            description: (
              <div className="flex items-center justify-between gap-4">
                <p>Project Deleted Successfully</p>
                <span>
                  <CheckCheck className="h-4 w-4" />
                </span>
              </div>
            ),
            variant: "destructive",
          });
          fetchProjects();
          Router.refresh();
        }
      }
    } catch (error) {
      toast({
        description: (
          <div className="flex items-center justify-between">
            <span>Oops something went wrong.</span>
            <ShieldAlert />
          </div>
        ),
        action: <ToastAction altText="Try Again">Try again</ToastAction>,
      });
    }
  };

  const ProjectPayment = async () => {
    try {
      setPaying(true);
      if (currentProject._id || _id) {
        const response = await axios.post("/api/checkout", {
          projectId: currentProject?._id || _id,
        });
        if (response.data) {
          window.location = response.data;
        }
      }

      setPaying(false);
    } catch (error) {
      console.log("something went wrong");
      toast({
        title: "Something Went wrong",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <>
      {isDeleteState && (
        <Dialogue
          handleDelete={Delete}
          isDeleteState={isDeleteState}
          setIsDeleteState={setIsDeleteState}
          isDeleting={isDeleting}
        />
      )}
      <div className="flex flex-col p-2 bg-black rounded-3xl text-white w-full">
        <div className="flex flex-col p-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm font-poppins">
                {currentProject.createdAt?.toString().split("T")[0]}
              </p>
            </div>
          </div>
          {!isEditing && (
            <div className="flex items-center justify-center p-2">
              <p className="font-light 2xl:text-xl text-lg text-center font-poppins">
                {project_type}
              </p>
            </div>
          )}
          <div className="flex flex-col">
            {isEditing ? (
              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem className="gap-4 flex flex-col justify-between ">
                            <Select
                              disabled={isLoading}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl className="flex items-center justify-between gap-2">
                                <SelectTrigger
                                  className="w-full h-[25px] items-center justify-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus:outline-none overflow-hidden  bg-black font-serif text-lg p-4 text-white z-10"
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
                        name="projectName"
                        render={({ field }) => (
                          <FormItem className="gap-1 flex flex-col justify-between">
                            <FormLabel className="text-sm font-semibold font-poppins">
                              Project Title
                            </FormLabel>
                            <FormControl className="text-white">
                              <Input
                                disabled={isLoading}
                                placeholder="Please enter your name"
                                {...field}
                                className="w-full h-[25px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none overflow-hidden bg-white bg-opacity-40 p-3 font-poppins text-white text-xs font-normal "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="Price"
                        render={({ field }) => (
                          <FormItem className="gap-4 flex flex-col justify-between">
                            <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold ml-4">
                              Price
                            </FormLabel>
                            <FormControl className="relative">
                              <div className="flex items-center relative">
                                <span className="absolute inset-y-0 left-4 z-10 flex items-center text-white">
                                  $
                                </span>
                                <Input
                                  disabled={isLoading}
                                  type="number"
                                  placeholder="0"
                                  {...field}
                                  className="w-full h-[25px] pl-12 pr-4 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none overflow-hidden bg-white bg-opacity-40 rounded-xl text-xs font-normal font-poppins"
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
                                    } else if (
                                      inputValue === "" ||
                                      inputValue === "0"
                                    ) {
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
                          <FormItem className="gap-4 flex flex-col justify-between">
                            <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold ml-4 font-poppins">
                              Project Requirements
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                disabled={isLoading}
                                placeholder="List project requirements (i.e duration , technologies etc...)"
                                {...field}
                                className="w-full h-[60px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus:outline-none overflow-hidden bg-white bg-opacity-40 p-4 rounded-xl text-xs font-poppins font-normal"
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
                          <FormItem className="gap-4 flex flex-col justify-between">
                            <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold ml-4">
                              Project Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                disabled={isLoading}
                                placeholder="Tell me more about your project (i.e your vision ,style & purpose...)"
                                {...field}
                                className="w-full h-[80px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus:outline-none overflow-hidden bg-white bg-opacity-40 p-4 rounded-xl text-xs font-poppins font-normal"
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
                        name="fileUrl"
                        render={({ field }) => (
                          <FormItem className=" gap-4 flex flex-col w-full">
                            <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold font-poppins">
                              Upload Files
                            </FormLabel>
                            <FormControl>
                              <UploadfileonCard
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

                    <Separator className="mt-4" />
                    <div className="flex items-center justify-center gap-2 mt-2">
                      {isEditing && (
                        <div className="flex items-center justify-between gap-4 mt-2">
                          <button
                            className="flex items-center gap-2 text-xs rounded-lg bg-rose-300 px-3 py-2 font-poppins text-black"
                            onClick={() => ToggleEdit()}
                          >
                            Cancel{" "}
                            <span>
                              <img
                                src="/cancel.png"
                                height={20}
                                width={20}
                                alt="cancel"
                              />
                            </span>
                          </button>
                          <button
                            type="submit"
                            className="flex items-center gap-2 text-xs rounded-lg bg-blue-300 px-3 py-2 font-poppins text-black"
                          >
                            {isSubmitting ? (
                              <img
                                src="/arrows.png"
                                alt="loading"
                                width={20}
                                height={20}
                                className="animate-spin px-4 py-2 z-10"
                              />
                            ) : (
                              <>
                                Save{" "}
                                <span>
                                  <img
                                    src="/download.png"
                                    height={20}
                                    width={20}
                                    alt="save"
                                  />
                                </span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            ) : (
              <div>
                <ProjectAccordion label="title" content={project_title} />
                <ProjectAccordion
                  label="Description"
                  content={project_description}
                />
                <ProjectAccordion
                  label="Requirement"
                  content={project_requirements}
                />
                <ProjectAccordion label="price" price={price} />
                <ProjectAccordion label="Files" files={projectFiles} />
              </div>
            )}
            {!isEditing && (
              <>
                <div className="flex mt-2  items-center gap-4 font-semibold">
                  <p>Paid :</p>
                  {paid === false ? (
                    <div className="bg-red-600 px-2 py-1 rounded-lg font-poppins text-xs items-center text-center font-normal">
                      {paid.toString()}
                    </div>
                  ) : (
                    <div className="bg-green-600 px-2 py-1 rounded-lg font-poppins text-xs items-center text-center font-normal">
                      {paid.toString()}
                    </div>
                  )}
                </div>
                <Separator className="mt-4" />
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-2 text-xs rounded-lg bg-yellow-300 px-3 py-2 font-poppins text-black font-normal"
                      onClick={() => ToggleEdit()}
                    >
                      Edit{" "}
                      <img src="/edit.png" alt="edit" height={15} width={15} />
                    </button>
                    <button
                      className="flex items-center gap-2 text-xs rounded-lg bg-rose-300 px-3 py-2 font-poppins text-black font-normal"
                      onClick={() => setIsDeleteState(true)}
                    >
                      Delete
                      <img
                        src="/trash.png"
                        alt="delete"
                        height={15}
                        width={15}
                      />
                    </button>
                    {paid === false && (
                      <button
                        className="flex items-center gap-2 text-xs rounded-lg bg-green-300 px-3 py-2 font-poppins text-black font-normal"
                        onClick={ProjectPayment}
                      >
                        {isPaying ? (
                          <img
                            src="/arrows.png"
                            alt="loading"
                            width={20}
                            height={20}
                            className="animate-spin"
                          />
                        ) : (
                          <>
                            Buy{" "}
                            <img
                              src="/buy.png"
                              alt="buy"
                              height={15}
                              width={15}
                            />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectEditCard;
