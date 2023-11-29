import React, { Children, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeitem";

const GroupChatModal = ({ children }) => {
  const { user, chats, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  //
  const toast = useToast();
  const toastIdRef = React.useRef();
  const addToast = (title, status, dec) => {
    toastIdRef.current = toast({
      title: title,
      status: status,
      description: dec,
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };

  //
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

      //   const { data } = await axios.get(`/api/user/?search=${query}`, config);
      const { data } = await axios.get(`/api/user/?search=${query}`, config);
      setSearchResults(data);

      setLoading(false);
    } catch (error) {
      addToast("Error Occurred!", "error", error.message);
      setLoading(false);
    }
  };

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
    } catch (error) {
      console.log(error.message);
    }
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
        <ModalOverlay></ModalOverlay>
        <ModalContent color={"#eeeeee"} bg={"#222222"}>
          <ModalHeader
            fontSize={{ base: "18px", md: "25px", lg: "35px" }}
            display={"flex"}
            justifyContent={"center"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton color={"#3e7949"} _hover={{ color: "#46a758" }} />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <FormControl>
              <Input
                bg={"#111111"}
                borderColor={"#111111"}
                placeholder="chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Input
                bg={"#111111"}
                borderColor={"#111111"}
                placeholder="Add users eg: pavan, pav@gmail.com"
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
            <Button
              bg={"#3e7949"}
              _hover={{ bg: "#46a758" }}
              onClick={handelSubmit}
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
