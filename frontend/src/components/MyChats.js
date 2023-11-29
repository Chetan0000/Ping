import { Avatar, Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./Loading/ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import UserImage from "./UserAvatar/UserImage";

const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState([]);

  const toast = useToast();
  const toastIdRef = React.useRef();
  const addToast = (title, status) => {
    toastIdRef.current = toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("api/chat", config);
      setChats(data);
    } catch (error) {
      addToast("Failed to Load the Chats", "error");
      return;
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDirection={"column"}
        alignItems={"center"}
        p={3}
        bg={"#222222"}
        color={"#eeeeee"}
        w={{ base: "100%", md: "31%" }}
        borderColor={"#222222"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "24px", md: "30px" }}
          //   fontFamily={"work sans"}
          display={"flex"}
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          Chats
          <GroupChatModal>
            <Button
              display={"flex"}
              bg={"#222222"}
              color={"#eeeeee"}
              colorScheme="white"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={
                <AddIcon color={"#3e7949"} _hover={{ color: "#46a758" }} />
              }
            >
              <Text display={{ base: "none", md: "block" }}>
                New Group Chat
              </Text>
            </Button>
          </GroupChatModal>
        </Box>
        <Box
          display={"felx"}
          flexDirection={"column"}
          p={3}
          w={"100%"}
          h={"100%"}
          borderRadius={"lg"}
          overflow={"hidden"}
        >
          {chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat) => (
                <Box
                  display={"flex"}
                  gap={"10px"}
                  // justifyContent={"center"}
                  alignItems={"center"}
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#191919" : "#111111"}
                  color={"#eeeeee"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <UserImage chat={chat} />
                  <Box display={"flex"} flexDir={"column"}>
                    <Text>
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Text>
                    {chat.latestMessage && (
                      <Text fontSize="xs">
                        <b>{chat.latestMessage.sender.name} : </b>
                        {chat.latestMessage.content.length > 15
                          ? chat.latestMessage.content.substring(0, 16) + "..."
                          : chat.latestMessage.content}
                      </Text>
                    )}
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading></ChatLoading>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;
