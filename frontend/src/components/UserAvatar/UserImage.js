import { Avatar } from "@chakra-ui/react";
import React from "react";

const UserImage = ({ chat }) => {
  return (
    <>
      {chat.isGroupChat ? (
        <Avatar mr={2} size={"sm"} cursor={"pointer"} />
      ) : (
        <Avatar mr={2} size={"sm"} cursor={"pointer"} src={chat.users[1].pic} />
      )}
    </>
  );
};

export default UserImage;
