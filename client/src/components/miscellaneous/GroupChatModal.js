import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  //   context api
  const { user, chats, setChats } = ChatState();

  //  add tost function
  const toast = useToast();
  const toastIdRef = React.useRef();
  const addToast = (title, status, dic) => {
    toastIdRef.current = toast({
      title: title,
      description: dic,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };

  //   function to search users on change in form
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
      addToast("Error Occurred!", "error", "PLease try some time later...!");
    }
  };

  //   function to handel submit
  const handelSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      addToast("please fill all the fields", "warning");
      return;
    } else if (selectedUsers.length < 2) {
      addToast(
        "No.!",
        "warning",
        "to create a group chat Add more then 2 members.."
      );
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
    } catch (error) {}
  };

  const handelGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handelDelete = (user) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={{ base: "18px", md: "25px", lg: "35px" }}
            fontFamily={"work sans"}
            display={"flex"}
            justifyContent={"center"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              ></Input>
              <Input
                placeholder="Add Users eg: pavan, pav@gmal.com"
                mb={3}
                onChange={(e) => handelSearch(e.target.value)}
              ></Input>
            </FormControl>
            <Box w="100%" display={"flex"} flexDir={"row"} flexWrap="wrap">
              {selectedUsers.map((user) => {
                return (
                  <UserBadgeItem
                    key={user._id}
                    user={user}
                    handelFunction={() => handelDelete(user)}
                  />
                );
              })}
            </Box>
            {loading ? (
              <Spinner />
            ) : (
              searchResults?.slice(0, 4).map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handelFunction={() => handelGroup(user)}
                  />
                );
              })
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handelSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
