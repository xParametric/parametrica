"use client";
import { useStorageUpload } from "@thirdweb-dev/react";
import { useData } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Container,
  Card,
  CircularProgress,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";

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
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box textAlign="center" mb={4}>
          <Button
            variant="contained"
            onClick={() => router.push("/create/markets")}
            sx={{ mb: 2 }}
          >
            See All Markets
          </Button>
        </Box>
        <Card raised sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h5" component="h2" mb={3} fontWeight="bold">
            Add New Market
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Market Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Market Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
            <FormControl variant="filled" fullWidth>
              <Button variant="outlined" component="label" disabled={isLoading}>
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Button>
              {isLoading && <CircularProgress size={24} sx={{ mt: 2 }} />}
            </FormControl>
            <TextField
              label="Resolve URL"
              value={resolverUrl}
              onChange={(e) => setResolverUrl(e.target.value)}
              fullWidth
            />
            <DatePicker
              label="End Date"
              value={timestamp}
              onChange={(newDate: any) => setTimestamp(newDate)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={
                isLoading ||
                !title ||
                !description ||
                !imageHash ||
                !timestamp ||
                !resolverUrl
              }
              sx={{ mt: 2 }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Market"
              )}
            </Button>
            {error && (
              <Typography color="error" mt={2}>
                {error}
              </Typography>
            )}
          </Box>
        </Card>
      </Container>
    </>
  );
}

export default Admin;
