import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton startColor="#313131" endColor="#484848" height="35px" />
      <Skeleton startColor="#313131" endColor="#484848" height="35px" />
      <Skeleton startColor="#313131" endColor="#484848" height="35px" />
      <Skeleton startColor="#313131" endColor="#484848" height="35px" />
      <Skeleton startColor="#313131" endColor="#484848" height="35px" />
      <Skeleton startColor="#313131" endColor="#484848" height="35px" />
      <Skeleton startColor="#313131" endColor="#484848" height="35px" />
    </Stack>
  );
};

export default ChatLoading;
