import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import ChatLoading from "../Loading/ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import ProfileModel from "./ProfileModel";
import { getSender } from "../../config/ChatLogics";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const toastIdRef = React.useRef();

  // const history = useHistory();

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

  //   logout
  const logoutHandler = () => {
    navigate("/");
  };

  //   search handel function
  const handelSearch = async () => {
    if (!search) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      return;
    }
  };

  //   access chats function

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      console.log("access chat check");

      const { data } = await axios.post("/api/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      setLoadingChat(false);
      return;
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"#222222"}
        width={"100%"}
        p={"5px 10px 5px 10px"}
        borderRadius={"lg"}
      >
        {/* search button  */}
        <Tooltip
          hasArrow
          label="Search users to chat"
          color="black"
          placement="bottom-end"
          //   onClick={onOpen(isOpen)}
        >
          <Button
            bg={"#222222"}
            _hover={{ bg: "#222222" }}
            color={"#eeeeee"}
            onClick={onOpen}
          >
            <IconButton
              color={"#eeeeee"}
              colorScheme="white"
              aria-label="Search database"
              icon={
                <SearchIcon color={"#3e7949"} _hover={{ color: "#3e7949" }} />
              }
            />
            <Text display={{ base: "none", md: "flex" }} px={"4"}>
              Search Here
            </Text>
          </Button>
        </Tooltip>

        {/* logo */}
        <Text fontSize={"2xl"}>Logo</Text>

        {/* Menu --> profile and LogOut */}
        <Box
          // change width after adding log ------------->
          width={{ base: "", md: "191px" }}
          display={"flex"}
          justifyContent={"end"}
        >
          {/* Bell icon  */}
          <Menu>
            <MenuButton
              color={"#3e7949"}
              _hover={{ color: "#3e7949" }}
              bg={"#222222"}
              as={IconButton}
              aria-label="Options"
              colorScheme="white"
            >
              {/* <NotificationBadge
                count={notification.length}
                Effect={Effect.SCALE}
              /> */}
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList
              bg={"#111111"}
              color={"#eeeeee"}
              borderColor={"#111111"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {!notification.length && "no new Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  bg={"#111111"}
                  color={"#eeeeee"}
                  borderColor={"#111111"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroup
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {/* profile and logout menu */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={
                <ChevronDownIcon
                  color={"#3e7949"}
                  _hover={{ color: "#3e7949" }}
                />
              }
              colorScheme="white"
            >
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
                src={user.pic}
              ></Avatar>
            </MenuButton>
            <MenuList
              bg={"#222222"}
              borderColor={"#222222"}
              color={"#3e7949"}
              _hover={{ color: "#3e7949" }}
            >
              <ProfileModel user={user}>
                <MenuItem bg={"#222222"}>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider bg={"#222222"} borderColor={"#eeeeee"}></MenuDivider>
              <MenuItem bg={"#222222"} onClick={logoutHandler}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent color={"#eeeeee"} bg={"#222222"}>
          <DrawerCloseButton color={"#3e7949"} _hover={{ color: "#46a758" }} />
          <DrawerHeader borderBottomWidth={"1px"} bg={"#191919"}>
            Search User
          </DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} paddingBottom={"15px"}>
              <Input
                bg={"#191919"}
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                borderColor={"#191919"}
              />
              <Button
                onClick={handelSearch}
                bg={"#3e7949"}
                _hover={{ background: "#46a758" }}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handelFunction={() => accessChat(user._id)}
                  />
                );
              })
            )}
            {loadingChat && <Spinner ml={"auto"} d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
