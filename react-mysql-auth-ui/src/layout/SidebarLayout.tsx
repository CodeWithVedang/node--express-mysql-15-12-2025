import { Box, VStack, Button, Text, HStack, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <HStack align="start">
      <VStack
        w="220px"
        h="100vh"
        p={5}
        bg="gray.900"
        color="white"
        spacing={4}
        align="stretch"
      >
        <Text fontSize="xl" fontWeight="bold">Dashboard</Text>

        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>

        {auth.role === "admin" && <Link to="/logs">Login Logs</Link>}

        <Divider />

        <Text fontSize="sm">
          Session expires in: {auth.countdown}s
        </Text>

        <Button colorScheme="red" onClick={auth.logout}>
          Logout
        </Button>
      </VStack>

      <Box flex="1" p={5}>
        {children}
      </Box>
    </HStack>
  );
}
