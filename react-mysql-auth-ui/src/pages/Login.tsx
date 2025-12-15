import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  useToast
} from "@chakra-ui/react";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const auth = useAuth();
  const toast = useToast();

  const submit = async () => {
    const ok = await auth.login(username, password);

    if (ok) {
      toast({
        title: "Login successful",
        description: "Session active for 60 seconds",
        status: "success",
        duration: 3000,
        position: "top",
      });
      window.location.href = "/";
    } else {
      toast({
        title: "Invalid login",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} borderWidth="1px" rounded="lg">
      <Heading mb={5}>Login</Heading>
      <VStack spacing={4}>
        <Input placeholder="Username" onChange={(e) => setU(e.target.value)} />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setP(e.target.value)}
        />
        <Button w="full" colorScheme="blue" onClick={submit}>
          Login
        </Button>
      </VStack>
    </Box>
  );
}
