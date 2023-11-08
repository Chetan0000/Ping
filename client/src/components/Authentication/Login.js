import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const submitHandler = () => {};
  const handelClick = () => {
    setShow(!show);
  };
  return (
    <>
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
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <FormLabel fontSize={"14px"}>Password</FormLabel>{" "}
          <Link color={"rgba(66, 153, 225, 0.6)"} fontSize={"10px"}>
            forgot password
          </Link>
        </Flex>

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
      <Button
        //   bg={"#238636"}
        marginTop={"20px"}
        fontSize={"14px"}
        colorScheme="blue"
        width={"100%"}
        style={{}}
        onclick={submitHandler}
      >
        Sign in
      </Button>
      <Button
        //   bg={"#238636"}
        variant={"solid"}
        h={"35px"}
        marginTop={"20px"}
        fontSize={"14px"}
        // bg={"gr"}
        colorScheme="green"
        width={"100%"}
        onClick={
          (submitHandler,
          (e) => {
            setEmail("demo@gmail.com");
            setPassword("demo@123");
          })
        }
      >
        Gest user
      </Button>
    </>
  );
};

export default Login;
