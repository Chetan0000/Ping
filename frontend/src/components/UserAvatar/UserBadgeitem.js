import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handelFunction }) => {
  return (
    <>
      <Box
        px={2}
        py={1}
        borderRadius={"xg"}
        m={1}
        mb={2}
        fontSize={12}
        cursor={"pointer"}
        onClick={handelFunction}
        bg={"#191919"}
        color={"#eeeeee"}
      >
        {user.name}
        <CloseIcon pl={1} color={"#3e7949"} _hover={{ color: "#46a758" }} />
      </Box>
    </>
  );
};

export default UserBadgeItem;
