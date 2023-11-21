import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="35px" />
      <Skeleton height="35px" />
      <Skeleton height="35px" />
      <Skeleton height="35px" />
      <Skeleton height="35px" />
      <Skeleton height="35px" />
    </Stack>
  );
};

export default ChatLoading;
