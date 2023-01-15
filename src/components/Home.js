import { Box, Text } from "@chakra-ui/react";

function Home({ user, uid, db }) {
  return (
    <Box px={6} py={4}>
      <Text fontSize="lg">Welcome {user.displayName} 👋</Text>
    </Box>
  );
}

export default Home;
