import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/SignUp";

const HomePage = () => {
  return (
    <>
      <Container
        maxW={{ base: "300px", md: "400px", lg: "400px" }}
        m={"auto"}
        centerContent
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          p={3}
          width={"100%"}
          m={"40px 0 15px 0"}
          borderRadius={"lg"}
          className="backGroundColor"
        >
          <Text textAlign={"center"} fontSize={"4xl"}>
            Ping
          </Text>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          p={3}
          width={"100%"}
          m={"40px 0 15px 0"}
          borderRadius={"lg"}
          className="backGroundColor"
        >
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab>Login</Tab>
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
