import {
  Box,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Tooltip,
  IconButton,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import "./Home.css";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import MyTasks from "./MyTasks";
import GroupTasks from "./GroupTasks";
import Settings from "./Settings";

function Home({ user, uid, db, logOut }) {
  const [tab, setTab] = useState("My Tasks");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box w="full">
      <Navbar
        toggleColorMode={toggleColorMode}
        colorMode={colorMode}
        logOut={logOut}
        user={user}
        uid={uid}
        db={db}
        setTab={setTab}
      ></Navbar>
      {tab === "My Tasks" ? (
        <MyTasks user={user} uid={uid} db={db} />
      ) : tab === "Group Tasks" ? (
        <GroupTasks user={user} uid={uid} db={db} />
      ) : (
        <Settings user={user} uid={uid} db={db} />
      )}
    </Box>
  );
}

export default Home;
