import { Avatar, Box, Center, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handelFunction }) => {
  return (
    <>
      <Box
        onClick={handelFunction}
        cursor={"pointer"}
        bg={"#111111"}
        color={"#eeeeee"}
        _hover={{
          background: "#191919",
          color: "#eeeeee",
        }}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        px={3}
        py={2}
        mb={2}
        borderRadius={"lg"}
      >
        <Avatar
          mr={2}
          size={"sm"}
          cursor={"pointer"}
          name={user.name}
          src={user.pic}
        />
        <Box>
          <Text>{user.name}</Text>
          <Text fontSize={"xs"}>
            <b>Email : </b>
            {user.email}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default UserListItem;
