"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import {
  fetchUserDetails,
  selectUserDetails,
  getUserDetailsStatus,
  getUserDetailsError,
} from "@/lib/features/users/userDetailsSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { Container, Typography, Box, Card, CardContent, CardMedia, Skeleton } from "@mui/material";

const UserDetails: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((state: RootState) => selectUserDetails(state));
  const status = useSelector((state: RootState) => getUserDetailsStatus(state));
  const error = useSelector((state: RootState) => getUserDetailsError(state));

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetails(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "background.default",
        p: 4,
      }}>
      <Container maxWidth="sm">
        {status === "loading" ? (
          <Box>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={40}
              sx={{ mt: 2 }}
            />
            <Skeleton
              variant="text"
              width="60%"
              height={30}
            />
            <Skeleton
              variant="text"
              width="40%"
              height={30}
            />
          </Box>
        ) : status === "succeeded" ? (
          <Card>
            <CardMedia
              sx={{ objectFit: "contain" }}
              component="img"
              height="200"
              image={user?.avatar}
              alt={`${user?.first_name} ${user?.last_name}`}
            />
            <CardContent>
              <Typography
                variant="h5"
                component="div">
                {user?.first_name} {user?.last_name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary">
                ID: {user?.id}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary">
                Email: {user?.email}
              </Typography>
            </CardContent>
          </Card>
        ) : status === "failed" ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh">
            <Typography
              variant="h6"
              color="error">
              {error}
            </Typography>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default UserDetails;
