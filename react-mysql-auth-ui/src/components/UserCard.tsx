import { Box, Button, Heading, Text } from "@chakra-ui/react";
import api from "../api/axiosClient";

interface Props {
  user: { id: number; name: string; role: string; status: string };
  refresh: () => void;
}

export default function UserCard({ user, refresh }: Props) {
  const remove = async () => {
    await api.delete(`/users/${user.id}`);
    refresh();
  };

  return (
    <Box borderWidth="1px" p={4} rounded="md" bg="gray.50">
      <Heading size="md">{user.name}</Heading>
      <Text>Role: {user.role}</Text>
      <Text>Status: {user.status}</Text>

      <Button mt={3} colorScheme="red" size="sm" onClick={remove}>
        Delete
      </Button>
    </Box>
  );
}
