"use client";
import { create } from "ipfs-http-client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Container,
} from "@mui/material";

import { useData } from "@/context/DataContext";

const Admin = () => {
  const router = useRouter();
  const { polymarket, loadWeb3, account } = useData!();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageHash, setImageHash] = useState("");
  const [resolverUrl, setResolverUrl] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const uploadImage = async (e: any) => {
    try {
      const file = e.target.files[0];
      const added = await client.add(file);
      setImageHash(added.path);
    } catch (uploadError) {
      setError("Failed to upload image.");
      console.log(uploadError);
    }
  };

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
      // setTitle("");
      // setDescription("");
      // setImageHash("");
      // setResolverUrl("");
      // setTimestamp(undefined);

      router.push("/");
    } catch (submitError) {
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
        <title>xParametric</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 5,
        }}
      >
        <Container maxWidth="lg">
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginTop: 5, marginBottom: 5, width: "100%" }}
            onClick={() => router.push("/admin/markets")}
          >
            See All Markets
          </Button>
          <Box
            sx={{
              border: 1,
              borderColor: "grey.300",
              borderRadius: 2,
              padding: 5,
              width: "100%",
            }}
          >
            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: "bold" }}>
              Add New Market
            </Typography>
            <TextField
              label="Market Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ marginTop: 3 }}
            />
            <TextField
              label="Market Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              sx={{ marginTop: 3 }}
            />
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <InputLabel>Market Title Image</InputLabel>
              <input type="file" onChange={uploadImage} />
            </FormControl>
            <TextField
              label="Resolve URL"
              name="resolverUrl"
              value={resolverUrl}
              onChange={(e) => setResolverUrl(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ marginTop: 3 }}
            />
            <TextField
              type="date"
              label="Timestamp"
              name="timestamp"
              value={timestamp}
              onChange={handleDateChange}
              variant="outlined"
              fullWidth
              sx={{ marginTop: 3 }}
            />
            {loading ? (
              <Typography
                textAlign="center"
                variant="h6"
                sx={{ paddingTop: 3, paddingBottom: 3, fontWeight: "bold" }}
              >
                Loading...
              </Typography>
            ) : (
              <Button
                variant="contained"
                color="success"
                sx={{ marginTop: 5, width: "100%" }}
                onClick={handleSubmit}
              >
                Create Market
              </Button>
            )}
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Admin;
