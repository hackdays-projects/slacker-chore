import { useEffect, useState } from "react";
import { HStack, Checkbox, CloseButton, Box, Text } from "@chakra-ui/react";

function Task({ id, name, done, date, deleteTask }) {
  const [isDone, setIsDone] = useState(null);

  useEffect(() => {
    setIsDone(done);
  }, [done]);

  const handleInputChange = (e) => {
    setIsDone(e.target.checked);
  };

  const handleDelete = (e) => {
    if (deleteTask) {
      deleteTask(id);
    }
  };

  return (
    <Box pl={4} pr={2} w="full">
      <HStack w="full" key={id} justifyContent="space-between">
        <Checkbox
          onChange={handleInputChange}
          isChecked={isDone ? isDone : done}
        >
          {name}
        </Checkbox>
        <Text>{new Date(parseInt(date)).toDateString()}</Text>
        {deleteTask ? (
          <HStack>
            <CloseButton onClick={handleDelete}></CloseButton>
          </HStack>
        ) : null}
      </HStack>
    </Box>
  );
}

export default Task;
