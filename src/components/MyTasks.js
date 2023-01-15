import {
  Box,
  VStack,
  HStack,
  Text,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import Task from "./Task";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import "../App.css";

const percentageC = 20;
const numTasks = 20;
const numOverdue = 3;

function MyTasks({ user, uid, db }) {
  const [groupID, setGroupID] = useState(null);
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    onValue(ref(db, "users/" + uid + "/group"), (snapshot) => {
      if (snapshot.exists()) {
        const groupID = snapshot.val();
        setGroupID(groupID);
        onValue(
          ref(db, "groups/" + groupID + "/schedule/" + uid),
          (snapshot) => {
            if (snapshot.exists()) {
              setTasks(snapshot.val());
            }
          }
        );
      }
    });
  }, []);
  return (
    <Box>
      <VStack align="flex-start" w="full">
        <Box px={6} py={4}>
          <Text fontSize="25px" fontFamily="league spartan" fontWeight="bold">
            Welcome {user.displayName} 👋
          </Text>
        </Box>
        <Text pl={6} className="heading">
          My Tasks
        </Text>
        <Box key={uid} w="full">
          {!tasks ? null : (
            <VStack w="full" h="full" p={4} justifyContent="space-between">
              <VStack w="full">
                {/* {numTasks > 0 ? (
                  <Text fontWeight="bold">
                    {Math.round((numCompletedTasks / numTasks) * 100)}%
                    Completed
                  </Text>
                ) : null} */}
                <Box py={2} w="full">
                  <VStack
                    w="400px"
                    h="250px"
                    overflowY="auto"
                    border="1px"
                    borderColor="gray.200"
                    py={2}
                    borderRadius={4}
                  >
                    {Object.entries(tasks).map(([key, value], index) => (
                      <Box w="full">
                        <Task
                          id={key}
                          name={value.name}
                          date={key}
                          done={value.done}
                          //   updateParent={updateNumCompletedTasks}
                          isTask={true}
                        />
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </VStack>
          )}
        </Box>
        {/* <HStack>
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
        </HStack> */}
      </VStack>
    </Box>
  );
}

export default MyTasks;
