"use client";
import useProjectsStore from "@/lib/projectStore";
import { Order_Project_User } from "@/type";
import axios from "axios";
import { File, Loader2, Loader2Icon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, {  useRef, useState } from "react";
import { Slider } from "../ui/slider";
import { Progress } from "../ui/progress";
import ProjectAccordion from "../custom-ui/ProjectAccordian";
import { status } from "@/lib/mongodb";
import { Separator } from "../ui/separator";
import ProfileAvatar from "../custom-ui/ProfileAvatar";
import DropDownMenu from "../dashboard/DropDownMenu";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import qs from "query-string";
import Link from "next/link";
import Image from "next/image";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
      webkitdirectory?: string;
      directory?:string
  }
}

interface OrderProps {
  order: Order_Project_User;
}

const formSchema = z.object({
  Files: z.custom<FileList>((val) => val instanceof FileList, "Required").refine((file)=>file.length>0,"required"),
});

const EachOrder = ({ order }: OrderProps) => {
  const [currentOrder, setcurrentOrder] = useState(order);
  const [currentProject, setCurrentProject] = useState(order.Order_project);
  const { _id, Order_project, Order_user, paid } = order;
  const { user_name, user_email, user_image } = Order_user;
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isDelivering,setIsDelivering] = useState(false)
  const router = useRouter();
  const fetchAllOrders = useProjectsStore((state) => state.fetchAllOrders);
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Files: undefined,
    },
  });

  const updateProjectStatus = async (status: string) => {
    const updateStatus = async () => {
      try {
        setIsLoading(true);
        if (currentProject._id || order.Order_project?._id) {
          const response = await axios.patch(
            `/api/updateProject/${
              currentProject._id || order.Order_project?._id
            }`,
            { project_status: status }
          );
          setCurrentProject(response.data);
          fetchAllOrders();
          setIsLoading(false);
          router.refresh();
        }
      } catch (error) {
        console.log("Error occurred while updating the project");
      }
    };

    updateStatus();
  };

  const handleSliderChange = async (value: number) => {
    try {
      setIsLoading(true);
      if (currentProject._id || order.Order_project?._id) {
        // Check if _id is defined
        const response = await axios.patch(
          `/api/updateProgress/${
            currentProject._id || order.Order_project?._id
          }`,
          {
            project_progress: value,
          }
        );
        setCurrentProject(response.data);
        fetchAllOrders();
        setIsLoading(false);
        router.refresh();
      } else {
        console.log("Project ID is undefined");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error occurred while updating project progress:", error);
      setIsLoading(false);
    }
  };

  const DeleteProject = async () => {
    try {
      setIsDeleting(true);
      if (currentProject._id || order.Order_project?._id) {
        const url = qs.stringifyUrl({
          url: `/api/orders/delete`,
          query: {
            projectId: currentProject?._id.toString(),
            orderId: _id.toString(),
          },
        });
        const response = await axios.delete(url);
        setcurrentOrder(response.data);
        setIsDeleting(false);
        fetchAllOrders();
        router.refresh();
      }
    } catch (error) {
      console.log("ERROR WHILE DELETING PROJECT", error);
    }
  };

  const fileRef = form.register("Files");

  const UploadFile = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsFileUploading(true);
      if (!values.Files) {
        throw new Error("No file selected");
      }
  
      const formData = new FormData();
      const filesArray = Array.from(values.Files);
      for (const file of filesArray) {
        formData.append("files", file);
      }
  
      const response = await axios.post(
        "/api/uploadProjectFiles",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      const newBlob = await response?.data?.downloadUrl
      setBlob((prevBlobArray) => [...prevBlobArray,newBlob]);
      setIsFileUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteFile = async (url:string)=>{
     try {
       const response = await axios.delete(`/api/uploadProjectFiles`,{data:JSON.stringify(url)})
       const newBlob = await response?.data?.downloadUrl
       setBlob((prevBlobArray) => [...prevBlobArray, newBlob.downloadUrl]);

     } catch (error) {
       console.log(error)
     } 
  }

  const DeliverProject = async () =>{
    try {
      setIsDelivering(true)
      if(order._id && currentProject._id){
        const url = qs.stringifyUrl({
          url:`/api/DeliverProjectFiles/${currentProject._id}`,
          query:{
            orderId:order?._id.toString(),
            projectId:currentProject._id.toString()
          }
        })
        await axios.patch(url,{urls:blob})
        fetchAllOrders()
        router.refresh()
        setIsDelivering(false)
      }
     
    } catch (error) {
      console.log(error)
      setIsDelivering(false)
    }
  }

  return (
    <>
      <div className="relative flex flex-col p-2 mt-4 bg-black font-poppins text-white rounded-3xl">
        {isDeleting && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 z-10 rounded-3xl">
            <Loader2Icon className="animate-spin text-white" />
          </div>
        )}
        <div className="flex flex-col p-2">
          <div className="flex items-start justify-between">
            {/* //@ts-ignore */}
            <p className="font-semibold text-lg">
              {/* @ts-ignore */}
              {currentOrder?.createdAt?.toString().split("T")[0] ||order?.createdAt?.toString().split("T")[0]}
            </p>
            <span>
              <DropDownMenu
                handleChange={DeleteProject}
                isDeleting={isDeleting}
              />
            </span>
          </div>

          <div className="flex items-center justify-center p-8">
            <p className="font-bold text-3xl text-center">
              {currentProject?.project_type || Order_project?.project_type}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <ProjectAccordion
              content={
                currentProject?.project_title || Order_project?.project_title
              }
              label="Project Title"
            />
            <ProjectAccordion
              content={
                currentProject?.project_requirements ||
                Order_project?.project_requirements
              }
              label="Project Requirements"
            />
            <ProjectAccordion
              content={
                currentProject?.project_description ||
                Order_project?.project_description
              }
              label="Project Description"
            />
            <ProjectAccordion
              content={
                currentProject?.project_status || Order_project?.project_status
              }
              label="Project Status"
            />
            <ProjectAccordion
              files={
                currentProject?.projectFiles || Order_project?.projectFiles
              }
              label="Download Files"
            />
            {order?.paid && order?.Order_project?.paid && (
              <div className="flex items-center gap-4">
                <p className="font-bold font-poppins">Paid :</p>
                <span className="bg-green-600 px-2 py-1 rounded-lg font-poppins text-xs items-center text-center font-normal">
                  {paid.toString()}
                </span>
              </div>
            )}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-white text-black rounded-lg px-4 py-2 cursor-pointer font-bold mt-2">
                Upload File
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(UploadFile)}>
                      <DialogDescription>
                        <FormField
                          control={form.control}
                          name="Files"
                          render={() => (
                            <FormItem className="cursor-pointer">
                              <FormLabel>Upload Files</FormLabel>
                              <FormControl>
                                <>
                                <Input
                                  type="file"
                                  className="cursor-pointer"
                                  id="filepicker"
                                  {...fileRef}
                                  multiple
                                  directory=""
                                  webkitdirectory=""
                                />
                                 <ul id="listing"></ul>
                                 </>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </DialogDescription>
                      <DialogFooter>
                        <button
                          type="submit"
                          className="flex item-center px-4 py-2 bg-rose-400 hover:bg-rose-500 font-lg font-bold font-mono rounded-lg mt-2"
                        >
                          {isFileUploading ? (
                            <>
                              <Loader2Icon className="animate-spin" />
                            </>
                          ) : (
                            <> Upload</>
                          )}
                        </button>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          {blob.length > 0 &&  (
            <>
            <div className="relative flex items-center p-2 m-1 bg-white rounded-lg w-full gap-2">
              {blob?.map((url, index) => (
                <>
                  <Link href={url} className="relative z-10 text-black">
                    <Image src="/zip-folder.png" width={40} height={40} alt="ProjectFiles"/>
                    <X className="absolute top-0 right-0 text-rose-500 hover:bg-red-500 hover:text-black bg-white rounded-full p-1 h-4 w-4 z-10 cursor-pointer" onClick={()=>DeleteFile(url)}/>
                  </Link>
                </>
              ))}
              </div>
            </>
          )}

          <div className="flex flex-col gap-2 items-start mt-4">
            <p className="font-semibold text-lg">Progress</p>
            <Slider
              defaultValue={[
                currentProject?.project_progress ||
                  Order_project?.project_progress,
              ]}
              max={100}
              step={10}
              onValueChange={(v) => handleSliderChange(v[0])}
            />
            <Progress
              value={
                currentProject?.project_progress ||
                Order_project?.project_progress
              }
            />
            <div className="flex flex-row-reverse items-end w-full">
              <span className="font-semibold ">
                {currentProject?.project_progress ||
                  Order_project?.project_progress}
                %
              </span>
            </div>
          </div>

          <div>
            <div className="w-full flex items-center justify-center">
              <button
                onClick={DeliverProject}
                className="text-white bg-green-400  hover:bg-green-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                {isDelivering ? (
                   <>
                   <Loader2Icon className="animate-spin" />
                   </>
                ):(
                  <>
                  Deliver
                  </>
                )}
                
              </button>
              <button
                onClick={() => updateProjectStatus(status.inProgress)}
                className="text-white focus:ring-4 bg-sky-400 hover:bg-sky-500 focus:outline-none  shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                inProgress
              </button>

              <button
                onClick={() => updateProjectStatus(status.inQueue)}
                className="text-gray-900 bg-lime-400 hover:bg-lime-500 focus:ring-4 focus:outline-none  shadow-lg  dark:shadow-lg  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                InQueue
              </button>
              <button
                onClick={() => updateProjectStatus(status.rejected)}
                className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:outline-none shadow-lg  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Reject
              </button>
            </div>
          </div>
          {isLoading && (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin text-blue-500" />
            </div>
          )}

          <div className="mt-10 flex flex-col gap-2">
            <Separator />
            <div className="flex items-center gap-2">
              <ProfileAvatar imageSrc={user_image} />
              <p className="font-bold">{user_name}</p>
              <span>{user_email}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EachOrder;
