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

const percentageC = 20;
const numTasks = 20;
const numOverdue = 3;
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
        <VStack align="flex-start" w="full">
          <Box px={6} py={4}>
            <Text fontSize="25px" fontFamily="league spartan" fontWeight="bold">
              Welcome {user.displayName} 👋
            </Text>
          </Box>
          <HStack>
            <CircularProgress
              value={percentageC}
              color="green.400"
              thickness="9px"
              size="75px"
              ml="10"
            >
              <Tooltip
                label="Progress Completed"
                aria-label="A tooltip"
                colorScheme="green"
              >
                <CircularProgressLabel className="league-font">
                  {percentageC}%
                </CircularProgressLabel>
              </Tooltip>
            </CircularProgress>
            <CircularProgress
              value={numTasks}
              color="orange.400"
              thickness="9px"
              size="75px"
              ml="10"
            >
              <Tooltip
                label="Number of Tasks"
                aria-label="A tooltip"
                colorScheme="green"
              >
                <CircularProgressLabel className="league-font">
                  {numTasks}
                </CircularProgressLabel>
              </Tooltip>
            </CircularProgress>
            <CircularProgress
              value={numOverdue}
              color="red.400"
              thickness="9px"
              size="75px"
              ml="10"
            >
              <Tooltip
                label="Overdue Tasks"
                aria-label="A tooltip"
                colorScheme="green"
              >
                <CircularProgressLabel className="league-font">
                  {numOverdue}
                </CircularProgressLabel>
              </Tooltip>
            </CircularProgress>
            <Text className="title-text" margin="auto">
              Home
            </Text>
          </HStack>
        </VStack>
      ) : tab === "Group Tasks" ? (
        "Hello Group"
      ) : (
        "Im in settings"
      )}
    </Box>
  );
}

export default Home;
