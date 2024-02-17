"use client";
import { useStorageUpload } from "@thirdweb-dev/react";
import { useData } from "../context/DataContext";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/ui/loader";

function Admin() {
  const projectId = process.env.NEXT_PUBLIC_INFURA_ID;
  const projectSecretKey = process.env.NEXT_PUBLIC_INFURA_SECRET;

  const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);
  // console.log(authorization);

  const router = useRouter();
  const { polymarket, loadWeb3, account } = useData!();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const client = ipfsHttpClient({
  //   url: "https://ipfs.infura.io:5001/api/v0",
  //   headers: {
  //     authorization,
  //   },
  // });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageHash, setImageHash] = useState<any>("");
  const [resolverUrl, setResolverUrl] = useState("");
  const [timestamp, setTimestamp] = useState<any>("");
  const { mutateAsync: upload, isLoading } = useStorageUpload();

  async function handleFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      try {
        const uris = await upload({ data: [file] });
        console.log(uris);
        setImageHash(uris[0]);
      } catch (error) {
        console.error("Failed to upload file:", error);
      }
    }
  }

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        await loadWeb3();
      } catch (loadWeb3Error) {
        setError("Failed to load Web3.");
      }
    };

    if (!loading) {
      initWeb3();
    }
  }, [loading, loadWeb3]);

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();

      await polymarket.methods
        .createQuestion(
          title,
          imageHash,
          description,
          resolverUrl,
          new Date(timestamp).getTime()
        )
        .send({ from: account });
      toast.success("Market created successfully");

      router.push("/");
    } catch (submitError: any) {
      toast.error("Failed to create market.", submitError);
      setError("Failed to create market.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: any) => {
    setTimestamp(e.target.value);
  };
  const ipfsBaseUrl = "https://ipfs.io/ipfs/";
  const formattedImageHash = imageHash?.replace("ipfs://", "");
  const imageUrl = imageHash
    ? `${ipfsBaseUrl}${formattedImageHash}`
    : "https://source.unsplash.com/random";
  return (
    <>
      <Head>
        <title>xParametric - Admin</title>
        <meta name="description" content="Create a new market as an admin." />
      </Head>
      <div className="container  py-16">
        <div className="text-center mb-4">
          <button
            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-2"
            onClick={() => router.push("/create/markets")}
            type="button"
          >
            See All Markets
          </button>
        </div>
        <div className=" card border-opacity-50 raised p-4 md:p-8 border border-[#bdff00] bg-white bg-opacity-5  rounded-xl">
          <h2 className="text-xl font-bold mb-3">Add New Market</h2>
          <form className="flex flex-col gap-2" noValidate autoComplete="off">
            <Input
              className="input textfield"
              placeholder="Market Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              className="textarea textfield"
              placeholder="Market Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            ></Textarea>
            <div className="form-control">
              <Label className="label cursor-pointer">
                <span className="label-text">Upload Image</span>
                <Input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Label>
              {isLoading ? (
                <Loader />
              ) : (
                imageHash && (
                  <img
                    src={imageUrl}
                    alt="Market Banner"
                    className="w-1/2 h-36 object-cover rounded-md my-2"
                  />
                )
              )}
            </div>
            <Input
              className="input textfield"
              placeholder="Resolve URL"
              value={resolverUrl}
              onChange={(e) => setResolverUrl(e.target.value)}
            />
            {/* <DatePicker
              label="End Date"
              value={timestamp}
              onChange={(newDate: any) => setTimestamp(newDate)}
            /> */}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !timestamp && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {timestamp ? (
                    format(timestamp, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={timestamp}
                  onSelect={setTimestamp}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button
              className=" mt-2"
              onClick={handleSubmit}
              disabled={
                isLoading ||
                !title ||
                !description ||
                !imageHash ||
                !timestamp ||
                !resolverUrl
              }
            >
              {isLoading ? (
                <progress className="progress"></progress>
              ) : (
                "Create Market"
              )}
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Admin;
