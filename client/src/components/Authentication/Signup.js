import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

// import { fa-regular, fa-eye } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // pop-up notifications using toast
  const toast = useToast();
  const toastIdRef = React.useRef();
  // function to create tost's <pop-up notifications>
  const addToast = (title, status) => {
    toastIdRef.current = toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };

  // function to uplode file to cloud and get running url of the image
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
    console.log("check");
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
      history.push("/");
    } catch (error) {
      console.log(error);
      addToast("Error in signingUp.. Please try later", "error");
      setLoading(false);
    }
  };
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
          isLoading={loading}
          onClick={submitHandler}
        >
          Sign up
        </Button>
      </>
    </>
  );
};

export default Signup;
