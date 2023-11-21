import { ViewIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
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
          display={{ base: "flex" }}
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
          height={{ base: "300px", md: "380px" }}
          width={{ base: "75%" }}
        >
          <ModalHeader
            fontSize={"30px"}
            fontFamily={"work sana"}
            display={"flex"}
            justifyContent={"center"}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
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

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
