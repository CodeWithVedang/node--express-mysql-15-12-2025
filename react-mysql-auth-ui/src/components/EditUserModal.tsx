import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Input, Button, VStack, Select
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import api from "../api/axiosClient";

export default function EditUserModal({
  isOpen,
  onClose,
  user,
  refresh
}: {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  refresh: () => void;
}) {
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState(""); // optional
  const [name, setName] = useState(user?.name || "");
  const [role, setRole] = useState(user?.role || "user");
  const [status, setStatus] = useState(user?.status || "active");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setName(user.name);
      setRole(user.role);
      setStatus(user.status);
    }
  }, [user]);

  const updateUser = async () => {
    await api.put(`/users/${user.id}`, {
      username,
      password: password || undefined, // only sent if changed
      name,
      role,
      status
    });

    refresh();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>

        <ModalBody>
          <VStack spacing={4}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="New Password (optional)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Select>

            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </Select>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" onClick={updateUser}>
            Update User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
