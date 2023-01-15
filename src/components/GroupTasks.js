import {
  Box,
  Text,
  VStack,
  HStack,
  FormControl,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Divider,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from "@chakra-ui/react";
import "../App.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { ref, set, onValue, off } from "firebase/database";

function GroupTasks({ user, uid, db }) {
  const [groupID, setGroupID] = useState(null);
  const [group, setGroup] = useState(null);
  const [input, setInput] = useState("");
  const [num, setNum] = useState("0");
  const [occurence, setOccurence] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleNumChange = (e) => {
    setNum(e);
  };

  const handleOccurenceChange = (e) => {
    setOccurence(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskId = uuidv4();
    set(ref(db, "groups/" + groupID + "/tasks/" + taskId), {
      name: input,
      num: num,
      occurence: occurence,
    });
    if (group && group.users) {
      var today = new Date();
      var userIndex = 0;
      for (var i = 0; i < 30; i++) {
        if (occurence === "day") {
          today.setDate(today.getDate() + 1);
        } else if (occurence === "week") {
          today.setDate(today.getDate() + 7);
        } else today.setMonth(today.getMonth() + 1);
        set(
          ref(
            db,
            "groups/" +
              groupID +
              "/schedule/" +
              group.users[userIndex].uid +
              "/" +
              today.getTime()
          ),
          {
            name: input,
            done: false,
          }
        );
        userIndex++;
        if (userIndex >= group.users.length) userIndex = 0;
      }
    }
  };

  useEffect(() => {
    onValue(ref(db, "users/" + uid + "/group"), (snapshot) => {
      if (snapshot.exists()) {
        const groupID = snapshot.val();
        setGroupID(groupID);
        onValue(ref(db, "groups/" + groupID), (snapshot) => {
          if (snapshot.exists()) {
            setGroup(snapshot.val());
          }
        });
      }
    });
  }, []);
  return (
    <Box m="16px">
      <Text className="heading" mb="10px">
        Group Tasks
      </Text>
      {group === null ? (
        <Text>Join a group to see the group tasks</Text>
      ) : (
        <Box w="40vw">
          <Text fontSize="2xl" mb="10px">
            {group.name}
          </Text>
          {group.tasks === undefined || group.tasks === null ? (
            <Text mb="10px">Your group has no tasks</Text>
          ) : (
            <VStack
              borderRadius={10}
              border="1px"
              borderColor="gray.400"
              height="250px"
              my="10px"
            >
              {Object.keys(group.tasks).map((task) => {
                return (
                  <Box p={4} py={0} pt={2} w="full">
                    <HStack justify="space-between">
                      <Text>{group.tasks[task].name}</Text>
                      <Text>
                        every {group.tasks[task].num}{" "}
                        {group.tasks[task].occurence}
                      </Text>
                    </HStack>
                  </Box>
                );
              })}
            </VStack>
          )}
          <form onSubmit={handleSubmit}>
            <FormControl>
              <HStack>
                <Input
                  type="text"
                  placeholder="Add a task"
                  value={input}
                  onChange={handleInputChange}
                  required
                />
                <NumberInput value={num} onChange={handleNumChange} required>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Select
                  required
                  placeholder="Select occurence"
                  onChange={handleOccurenceChange}
                >
                  <option value="day">day</option>
                  <option value="week">week</option>
                  <option value="month">month</option>
                </Select>
                <Button colorScheme="blue" type="submit">
                  Add
                </Button>
              </HStack>
            </FormControl>
          </form>
        </Box>
      )}
    </Box>
  );
}

export default GroupTasks;
