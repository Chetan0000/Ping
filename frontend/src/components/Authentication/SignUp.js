import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // tost function and components
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

  // function to upload file/image to cloud and get running url of the image

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      addToast("Please Select an Image..!", "warning");
      setLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dzudljnu4");
      fetch("https://api.cloudinary.com/v1_1/dzudljnu4/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      addToast("Please Select an Image..!", "warning");
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !password || !email) {
      addToast("Please Fill all the fields.!", "warning");
      setLoading(false);
      return;
    }
    if (password !== conformPassword) {
      addToast("Password dos't Match..", "warning");
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
        "/api/user/signUp",
        { name, email, password, pic },
        config
      );
      addToast("Registration Successful", "success");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate.push();
    } catch (error) {
      console.log(error);
      addToast("Error in signingUp.. Please try later", "error");
      setLoading(false);
    }
  };
  const handelClick = () => {
    setShow(!show);
  };
  return (
    <>
      <FormControl id="first-name" isRequired>
        <FormLabel fontSize={"14px"}>Name</FormLabel>
        <Input
          fontSize={"14px"}
          borderColor={"#111111"}
          bg={"#111111"}
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
          borderColor={"#111111"}
          bg={"#111111"}
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
            borderColor={"#111111"}
            bg={"#111111"}
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
      <FormControl id="conform-password" isRequired>
        <FormLabel fontSize={"14px"}>Conform Password</FormLabel>
        <Input
          fontSize={"14px"}
          borderColor={"#111111"}
          bg={"#111111"}
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
          borderColor={"#111111"}
          bg={"#111111"}
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
        bg={"#3e7949"}
        _hover={{ bg: "#46A758" }}
        colorScheme="green"
        marginTop={"15px"}
        fontSize={"14px"}
        width={"100%"}
        style={{}}
        isLoading={loading}
        onClick={submitHandler}
      >
        Sign up
      </Button>
    </>
  );
};

export default SignUp;
