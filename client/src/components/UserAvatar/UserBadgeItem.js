import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
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
        variant="solid"
        fontSize={12}
        cursor={"pointer"}
        onClick={handelFunction}
      >
        {user.name}
        <CloseIcon pl={1} />
      </Box>
    </>
  );
};

export default UserBadgeItem;
