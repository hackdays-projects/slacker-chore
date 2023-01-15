import {
  Box,
  VStack,
  HStack,
  Text,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

const percentageC = 20;
const numTasks = 20;
const numOverdue = 3;

function MyTasks({ user, uid, db }) {
  return (
    <Box>
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
    </Box>
  );
}

export default MyTasks;
