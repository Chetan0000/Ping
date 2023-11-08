import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { fa-regular, fa-eye } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const postDetails = (picks) => {};
  const submitHandler = () => {};
  const handelClick = () => {
    setShow(!show);
  };

  //   button hover style
  return (
    <>
      <>
        <FormControl id="first-name" isRequired>
          <FormLabel fontSize={"14px"}>Name</FormLabel>
          <Input
            fontSize={"14px"}
            bg={"#050504"}
            placeholder="Enter Your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel fontSize={"14px"}>Email</FormLabel>
          <Input
            fontSize={"14px"}
            bg={"#050504"}
            type="email"
            placeholder="Enter Your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel fontSize={"14px"}>Password</FormLabel>
          <InputGroup>
            <Input
              fontSize={"14px"}
              bg={"#050504"}
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputRightElement>
              <Button
                marginRight={"2px"}
                colorScheme="#050504"
                // bg={"#050504"}
                color={"white"}
                fontSize={"14px"}
                h={"1.75rem"}
                size={"sm"}
                onClick={handelClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="conform-password" isRequired>
          <FormLabel fontSize={"14px"}>Conform Password</FormLabel>
          <Input
            fontSize={"14px"}
            bg={"#050504"}
            placeholder="Conform Password"
            onChange={(e) => {
              setConformPassword(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="pic">
          <FormLabel fontSize={"14px"}>Profile Picture</FormLabel>
          <Input
            fontSize={"14px"}
            bg={"#050504"}
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => {
              postDetails(e.target.files[0]);
            }}
          />
        </FormControl>
        <Button
          //   bg={"#238636"}

          marginTop={"15px"}
          fontSize={"14px"}
          colorScheme="blue"
          width={"100%"}
          style={{}}
          onclick={submitHandler}
        >
          Sign up
        </Button>
      </>
    </>
  );
};

export default Signup;
