"use client";
import React from "react";
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
import UploadFile from "@/components/uploadFile";
import { redirectToSignIn, useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";


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
    Id:string
}
const CreateProject = ({Id}:userProp) => {
  const { userId } = useAuth();
  const Router = useRouter()


  if (!userId) {
    redirectToSignIn();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectType: "",
      Requirements: "",
      Description: "",
      fileUrl: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/CreateProject", values);
      form.reset()
      Router.push(`/dashboard/overview/${Id}`)
    } catch (error) {
      console.log("Error occurred while creating project", error);
    }
  };

  const isLoading = form.formState.isSubmitting;


  return (
    <div className="relative mx-auto bg-[#FBDE4B] h-screen w-full p-8 overflow-hidden">
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
      <h1 className="font-bold text-6xl items-center text-center justify-center">
        Lets build your ideas
      </h1>
      <Form {...form}>
        <React.Fragment>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative grid sm:grid-cols-2 gap-8 mx-4 h-screen">
              <div className="relative h-screen grid-span-1 flex flex-col p-8 justify-between">
                <div className="space-y-8 px-9">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem className="mt-4 gap-4 flex flex-col justify-between">
                        <FormLabel className="text-2xl font-bold ml-4">
                          Project Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="Please enter your name"
                            {...field}
                            className="w-[500px] h-[50px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl focus:outline-none"
                            style={{
                              background:
                                "linear-gradient(to right bottom,rgba(255,255,255,0.5),rgba(255,255,255,0.2))",
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
                        <FormLabel className="text-2xl font-bold ml-4">
                          Project Type
                        </FormLabel>
                        <Select
                          disabled={isLoading}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger
                              className="w-[500px] h-[50px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl focus:outline-none"
                              style={{
                                background:
                                  "linear-gradient(to right bottom,rgba(255,255,255,0.5),rgba(255,255,255,0.2))",
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
                    name="Requirements"
                    render={({ field }) => (
                      <FormItem className="mt-4 gap-4 flex flex-col justify-between">
                        <FormLabel className="text-2xl font-bold ml-4">
                          Project Requirements
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={isLoading}
                            placeholder="List project requirements (i.e duration , technologies etc...)"
                            {...field}
                            className="w-[500px] p-4 h-[150px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl focus:outline-none overflow-hidden"
                            style={{
                              background:
                                "linear-gradient(to right bottom,rgba(255,255,255,0.5),rgba(255,255,255,0.2))",
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
                        <FormLabel className="text-2xl font-bold ml-4">
                          Project Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={isLoading}
                            placeholder="Tell me more about your project (i.e your vision ,style & purpose...)"
                            {...field}
                            className="w-[500px] p-4 h-[250px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl focus:outline-none overflow-hidden"
                            style={{
                              background:
                                "linear-gradient(to right bottom,rgba(255,255,255,0.5),rgba(255,255,255,0.2))",
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="absolute bottom-52 left-16 items-center">
                <Link href={`/dashboard/overview/${Id}`}>
                  <button
                    className="px-8 py-4 flex justify-between items-center gap-2 bg-rose-500 hover:bg-gradient-to-br font-bold text-lg text-black border-2 border-black hover:text-white hover:border-white hover:bg-black"
                    style={{ boxShadow: "5px 5px 0px rgba(0,0,0)" }}
                  >
                    <X />
                    Cancel
                  </button>
                  </Link>
                </div>
              </div>
              <div className="relative grid-span-1 border-black p-8 flex justify-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem className="mt-4 gap-4 flex flex-col w-full">
                      <FormLabel className="text-center text-3xl font-bold">
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
                <div className="absolute bottom-52 right-1/3 items-center">
                  <button
                    type="submit"
                    className="px-12 py-4 flex justify-between items-center gap-2 bg-green-500 hover:bg-gradient-to-br font-bold text-lg text-black border-2 border-black hover:text-white hover:border-white hover:bg-black"
                    style={{ boxShadow: "5px 5px 0px rgba(0,0,0)" }}
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
