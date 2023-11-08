import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const HomePage = () => {
  return (
    <>
      {/* name of hte app on home page  */}
      <Container
        maxW={{ base: "300px", md: "400px", lg: "400px" }}
        m={"auto"}
        centerContent
      >
        <Box
        // d="flex"
        // justifyContent="center"
        // alignItems="center"
        // p={3}
        // bg={"#121111"}
        // w="100%"
        // m="40px 0 15px 0"
        // borderRadius={"lg"}
        // borderWidth="0.2px"
        >
          <Text color={"white"} textAlign={"center"} fontSize={"4xl"}>
            Chat
          </Text>
        </Box>
        {/* --------- */}

        {/* Sign in and sign up box */}

        <Box
          d="flex"
          justifyContent="center"
          alignItems="center"
          p={3}
          bg={"#121111"}
          w="100%"
          m="40px 0 15px 0"
          borderRadius={"lg"}
          borderColor={"#121111"}
          borderWidth=""
        >
          <Tabs isFitted variant="enclosed" color={"white"}>
            <TabList mb="1em">
              <Tab>Sign in</Tab>
              <Tab>Sign up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;