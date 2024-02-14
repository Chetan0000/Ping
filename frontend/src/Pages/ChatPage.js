import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const CHatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <>
      <div style={{ width: "100%" }}>
        <Box w={"100%"} px={"10px"}>
          {user && <SideDrawer />}
        </Box>
        <Box
          display={"flex"}
          flexDir={"row"}
          justifyContent={"center"}
          width={"100%"}
          height={"91.5vh"}
          padding={"10px"}
          gap={"15px"}
        >
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </div>
    </>
  );
};

export default CHatPage;
