import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  // tost function and components
  const toast = useToast();
  const toastIdRef = React.useRef();
  const [loading, setLoading] = useState(false);
  // const history = useHistory();
  const navigate = useNavigate();
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

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      addToast("Oops..!", "warning", "Fill all the fields.");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      addToast("Log in Success", "success");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      setLoading(false);
      addToast("Error in Login", "error");
    }
  };

  const handelClick = () => {
    setShow(!show);
  };

  return (
    <>
      <FormControl id="email" isRequired>
        <FormLabel fontSize={"14px"}>Email</FormLabel>
        <Input
          borderColor={"#111111"}
          bg={"#111111"}
          fontSize={"14px"}
          type="email"
          placeholder="Enter Your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
      </FormControl>
      <FormControl isRequired>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <FormLabel fontSize={"14px"}>Password</FormLabel>{" "}
          <Link color={"#2b6cb0"} fontSize={"10px"}>
            forgot password
          </Link>
        </Flex>

        <InputGroup>
          <Input
            borderColor={"#111111"}
            bg={"#111111"}
            fontSize={"14px"}
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input>
          <InputRightElement>
            <Button
              marginRight={"2px"}
              colorScheme="#050504"
              color={"black"}
              fontSize={"14px"}
              h={"1.75rem"}
              size={"sm"}
              onClick={handelClick}
            >
              {show ? (
                <ViewIcon color={"white"} />
              ) : (
                <ViewOffIcon color={"white"} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        bg={"#3e7949"}
        _hover={{ bg: "#46A758" }}
        colorScheme="green"
        marginTop={"20px"}
        fontSize={"14px"}
        width={"100%"}
        onClick={submitHandler}
      >
        Sign in
      </Button>
      <Button
        bg={"#F4511E"}
        _hover={{ bg: "#FF5722" }}
        colorScheme="red"
        variant={"solid"}
        h={"35px"}
        marginTop={"20px"}
        fontSize={"14px"}
        width={"100%"}
        onClick={() => {
          setEmail("kumar@gmail.com");
          setPassword("123456");
        }}
      >
        Gest user
      </Button>
    </>
  );
};

export default Login;
