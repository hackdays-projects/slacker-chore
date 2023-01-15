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
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { ref, set, onValue, off } from "firebase/database";

function GroupTasks({ user, uid, db }) {
  const [group, setGroup] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [input, setInput] = useState("");
  const [num, setNum] = useState("0");
  const [occurence, setOccurence] = useState("Daily");

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
    set(ref(db, "groups/" + group + "/tasks/" + taskId), {
      name: input,
      num: num,
      occurence: occurence,
    });
  };

  useEffect(() => {
    onValue(ref(db, "users/" + uid + "/group"), (snapshot) => {
      if (snapshot.exists()) {
        const groupID = snapshot.val();
        setGroup(groupID);
        onValue(ref(db, "groups/" + groupID + "/groupName"), (snapshot) => {
          if (snapshot.exists()) {
            setGroupName(snapshot.val());
          }
        });
        onValue(ref(db, "groups/" + groupID + "/tasks"), (snapshot) => {
          if (snapshot.exists()) {
            setTasks(snapshot.val());
            console.log(snapshot.val());
          }
        });
      }
    });
  }, []);
  return (
    <Box>
      <Text>Group Tasks</Text>
      {group === null ? (
        <Text>Join a group to see the group tasks</Text>
      ) : (
        <Box w="40vw">
          <Text>{groupName}</Text>
          {tasks === null ? (
            <Text>Your group has no tasks</Text>
          ) : (
            <VStack borderRadius={10} border="1px" borderColor="gray.400">
              {Object.keys(tasks).map((task) => {
                return (
                  <HStack>
                    <Text>{tasks[task].name}</Text>
                    <Text>
                      every {tasks[task].num} {tasks[task].occurence}
                    </Text>
                  </HStack>
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
