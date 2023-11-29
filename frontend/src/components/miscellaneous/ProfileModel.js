import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const ProfileModel = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          color={"#3e7949"}
          bg={"#222222"}
          _hover={{ bg: "#222222", color: "#46a758" }}
          display={"flex"}
          icon={<ViewIcon />}
          onClick={onOpen}
        ></IconButton>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={{ base: "250px", md: "380px" }}
          width={{ base: "75%" }}
          color={"#eeeeee"}
          bg={"#111111"}
        >
          <ModalHeader
            fontSize={"30px"}
            // fontFamily={"work sana"}
            display={"flex"}
            justifyContent={"center"}
            paddingBottom={"-30px"}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton color={"#3e7949"} _hover={{ color: "#46a758" }} />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            gap={"15px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              borderRadius="full"
              boxSize={{ base: "90px", md: "130px" }}
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "16px", md: "20px" }}
              fontFamily={"work sans"}
            >
              Email: {user.email}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
