"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import "react-phone-input-2/lib/style.css";
import { isMobilePhone } from "validator";
import UploadProfile from "../project-modification/UploadProfile";
import { Loader2Icon, Save } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { useUserStore } from "@/lib/userStore";
import { useToast } from "../ui/use-toast";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  about: z.string().max(300),
  phoneNumber: z
    .string()
    .refine(isMobilePhone, { message: "Invalid phone number!" }),
  country: z.string(),
  imageUrl: z.string(),
});

interface Country {
  name: string;
  flag: string;
}

const ProfileSetting = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const MemoUser = useUserStore((state) => state.user);
  const { toast } = useToast();

  const user = useMemo(() => MemoUser, [MemoUser]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.user_name || "",
      about: user?.user_about || "",
      phoneNumber: user?.user_phoneNumber || "",
      country: user?.user_country || "",
      imageUrl: user?.user_image || "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
      form.setValue("name", user?.user_name || "");
      form.setValue("about", user?.user_about || "");
      form.setValue("phoneNumber", user?.user_phoneNumber || "");
      form.setValue("country", user?.user_country || "");
      form.setValue("imageUrl", user?.user_image || "");
    };

    fetchData();
  }, [
    fetchUser,
    form,
    user?.user_about,
    user?.user_country,
    user?.user_image,
    user?.user_name,
    user?.user_phoneNumber,
  ]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countriesData = response.data.map((country: any) => ({
          name: country.name.common,
          flag: country.flags.svg,
        }));
        setCountries(countriesData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching countries:", error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch("/api/updateProfile/update", values);
      form.reset();
      setIsEditing(false);
      fetchUser();
      toast({
        title: "Saved Successfully",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Oops something went wrong",
        variant: "destructive",
      });

      console.log("Error occurred while creating project", error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <>
      {isEditing ? (
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
                      name="name"
                      render={({ field }) => (
                        <FormItem className="mt-4 gap-4 flex flex-col justify-between">
                          <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold ml-4 font-poppins">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              placeholder="Please enter your name"
                              {...field}
                              onChange={field.onChange}
                              value={field.value}
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
                      name="about"
                      render={({ field }) => (
                        <FormItem className="mt-4 gap-4 flex flex-col justify-between">
                          <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold ml-4 font-poppins">
                            About{" "}
                            <code className="text-sm font-light text-zinc-500">{`(optional)`}</code>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              disabled={isLoading}
                              placeholder="Please enter your name"
                              {...field}
                              onChange={field.onChange}
                              value={field.value}
                              className="md:w-[500px] w-[350px]  h-[150px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus:outline-none overflow-hidden bg-white bg-opacity-40 p-4 "
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
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className="mt-4 gap-4 flex flex-col justify-between">
                          <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold ml-4">
                            PhoneNumber{" "}
                            <code className="text-sm font-light text-zinc-500">{`(optional)`}</code>
                          </FormLabel>
                          <FormControl className="relative">
                            <PhoneInput
                              country={"US"}
                              onChange={field.onChange}
                              value={field.value}
                              onBlur={field.onBlur}
                              onFocus={field.onBlur}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="mt-4 gap-4 flex flex-col justify-between ">
                          <FormLabel className="xl:text-2xl md:text-xl text-lg font-semibold ml-4 font-poppins">
                            Country{" "}
                            <code className="text-sm font-light text-zinc-500">{`(optional)`}</code>
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
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {loading ? (
                                <div>Loading countries...</div>
                              ) : (
                                countries.map((country, index) => (
                                  <SelectItem key={index} value={country.name}>
                                    <div className="flex w-full items-center justify-between">
                                      <p className="font-karla text-sm text-zinc-600">
                                        {country.name}
                                      </p>
                                      <img
                                        src={country?.flag}
                                        alt={country?.name}
                                        className="w-4 h-4 ml-2"
                                      />
                                    </div>
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="w-full flex">
                      <div className="flex items-center justify-between w-full">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="md:px-8 px-6 py-4 flex justify-between items-center gap-2 hover:bg-rose-500 bg-rose-400  font-serif font-bold md:text-lg text-sm text-black border-2 border-black"
                        >
                          Cancel{" "}
                          <Image
                            src="/cancel.png"
                            alt="cancel"
                            width={20}
                            height={20}
                          />
                        </button>
                        <button
                          type="submit"
                          className="md:px-8 px-6 py-4 flex justify-between items-center gap-2 hover:bg-green-500  bg-green-400 font-bold  md:text-lg text-sm text-black border-2 border-black"
                        >
                          {isLoading ? (
                            <>
                              <Loader2Icon className="animate-spin" />
                            </>
                          ) : (
                            <>
                              save <Save />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="mt-4 gap-4 flex flex-col w-full items-center">
                      <FormLabel className="text-center xl:text-2xl md:text-xl text-lg font-semibold font-poppins">
                        Upload Profile
                      </FormLabel>
                      <FormControl>
                        <UploadProfile
                          endPoint="ProfileUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </React.Fragment>
        </Form>
      ) : (
        <>
          <div className="grid xl:grid-cols-2 grid-cols-1 p-8 gap-4 w-full">
            <div className="col-span-1 flex w-full justify-center">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <h4 className="font-sans font-semibold text-2xl ml-2">
                    Name
                  </h4>
                  <div
                    className="mt-2 md:w-[500px] w-[350px] h-[50px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus:outline-none overflow-hidden bg-white bg-opacity-40 p-4  flex flex-col rounded-lg"
                    style={{
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <p>{user?.user_name}</p>
                  </div>
                </div>
                <div className="flex flex-col mt-8">
                  <h4 className="font-sans font-semibold text-2xl ml-2">
                    About
                  </h4>
                  <div
                    className="mt-2 md:w-[500px] w-[350px] h-[150px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus:outline-none overflow-hidden bg-white bg-opacity-40 p-4  flex flex-col rounded-lg"
                    style={{
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <p>{user?.user_about}</p>
                  </div>
                </div>
                <div className="flex flex-col mt-8">
                  <h4 className="font-sans font-semibold text-2xl ml-2">
                    PhoneNumber
                  </h4>
                  <div
                    className="mt-2 md:w-[500px] w-[350px] h-[50px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus:outline-none overflow-hidden bg-white bg-opacity-40 p-4  flex flex-col rounded-lg"
                    style={{
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <p>{user?.user_phoneNumber}</p>
                  </div>
                </div>
                <div className="flex flex-col mt-8">
                  <h4 className="font-sans font-semibold text-2xl ml-2">
                    Country
                  </h4>
                  <div
                    className="mt-2 md:w-[500px] w-[350px] h-[50px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0  focus:outline-none overflow-hidden bg-white bg-opacity-40 p-4  flex flex-col rounded-lg"
                    style={{
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <p>{user?.user_country}</p>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      fetchUser();
                    }}
                    className="md:px-8 px-6 py-4 flex justify-between items-center gap-2 bg-rose-500 hover:bg-gradient-to-br font-bold md:text-lg text-sm text-black border-2 border-black"
                  >
                    Edit{" "}
                    <Image
                      src="/edit.png"
                      alt="cancel"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-center w-full">
              <div className="relative h-80 w-80 flex items-center justify-center">
                <Image
                  src={user?.user_image}
                  alt="profile"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileSetting;
