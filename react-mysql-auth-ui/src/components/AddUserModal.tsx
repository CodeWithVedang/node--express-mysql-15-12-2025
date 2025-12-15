import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Input, Button, VStack
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../api/axiosClient";

export default function AddUserModal({
  isOpen,
  onClose,
  refresh,
}: {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const save = async () => {
    await api.post("/users", { username, password, name, role });
    refresh();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New User</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Role (admin/user)" onChange={(e) => setRole(e.target.value)} />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={save}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
