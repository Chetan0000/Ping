import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";

const UpdateGroupChat = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { selectedChat, setSelectedChat, user } = ChatState();

  const toast = useToast();
  const toastIdRef = React.useRef();
  const addToast = (title, status, dic) => {
    toastIdRef.current = toast({
      title: title,
      status: status,
      description: dic,
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };

  // function to remove user from group
  const handelRemove = async (person) => {
    if (selectedChat.groupAdmin._id !== user._id && person._id !== user._id) {
      addToast(
        "Got you..!",
        "warning",
        "Only Admin can Remove people from group!"
      );
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          users: person._id,
        },
        config
      );
      if (person._id === selectedChat.groupAdmin._id) {
      }
      person._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      addToast("Error Occurred!", "error");
    }
  };

  // function to Rename the group
  const handelRename = async () => {
    if (!groupChatName) {
      return;
    }

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      addToast("Error Occurred!", "error");
      setRenameLoading(false);
    }
  };

  // function to search user's
  const handelSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResults();
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user/?search=${query}`, config);
      setSearchResults(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      addToast("Error Occurred!", "error", "PLease try some time later...!");
    }
  };

  // function to add searched users to group
  const handelAddUser = async (person) => {
    if (selectedChat.users.find((u) => u._id === person._id)) {
      addToast("User Already is in group", "Warning");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      addToast("Got you..!", "warning", "Only Admin can add people to group!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: person._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      addToast("Error Occurred!", "error");
      setLoading(false);
    }
  };
  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          // height={{ base: "300px", md: "380px" }}
          width={{ base: "70%", md: "40%", lg: "40%" }}
        >
          <ModalHeader
            fontSize={{ base: "20px", md: "25px", lg: "30px" }}
            fontFamily={"Work sans"}
            // display={"flex"}
            // justifyContent={"center"}
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} display={"flex"} flexDir={"row"}>
              {selectedChat.users.map((user) => {
                return (
                  <UserBadgeItem
                    key={user._id}
                    user={user}
                    handelFunction={() => handelRemove(user)}
                  />
                );
              })}
            </Box>
            <FormControl display={"flex"}>
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant={"solid"}
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handelRename}
              >
                Update
              </Button>
            </FormControl>

            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handelSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size={"lg"} />
            ) : (
              searchResults?.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handelFunction={() => handelAddUser(user)}
                  />
                );
              })
            )}
          </ModalBody>

          <ModalFooter width={"100%"} display={"flex"} alignItems={"flex-end"}>
            <Button onClick={() => handelRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChat;
