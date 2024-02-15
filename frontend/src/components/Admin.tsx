"use client";
import { useStorageUpload } from "@thirdweb-dev/react";
import { useData } from "../context/DataContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

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
  const [imageHash, setImageHash] = useState("");
  const [resolverUrl, setResolverUrl] = useState("");
  const [timestamp, setTimestamp] = useState("");
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
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

  return (
    <>
      <Head>
        <title>xParametric - Admin</title>
        <meta name="description" content="Create a new market as an admin." />
      </Head>
      <div className="container mx-auto max-w-md py-16">
        <div className="text-center mb-4">
          <button
            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-2"
            onClick={() => router.push("/create/markets")}
            type="button"
          >
            See All Markets
          </button>
        </div>
        <div className="card raised p-4 md:p-8">
          <h2 className="text-xl font-bold mb-3">Add New Market</h2>
          <form className="flex flex-col gap-2" noValidate autoComplete="off">
            <input
              className="input textfield"
              placeholder="Market Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="textarea textfield"
              placeholder="Market Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            ></textarea>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Upload Image</span>
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
              {isLoading && (
                <progress className="progress w-24 mt-2"></progress>
              )}
            </div>
            <input
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
            <button
              className="btn btn-primary mt-2"
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
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Admin;
