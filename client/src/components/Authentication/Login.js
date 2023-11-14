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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();
  const toastIdRef = React.useRef();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const addToast = (title, status) => {
    toastIdRef.current = toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      addToast("Fill all the fields..!", "warning");
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
      addToast("Log In  Successful", "success");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/");
    } catch (error) {
      console.log(error);
      addToast("Error in Login ", "error");
      setLoading(false);
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
          fontSize={"14px"}
          bg={"#050504"}
          type="email"
          placeholder="Enter Your email"
          value={email}
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
            value={password}
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
        onClick={submitHandler}
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
