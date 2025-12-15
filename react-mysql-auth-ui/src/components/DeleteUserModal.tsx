import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Button, Text
} from "@chakra-ui/react";
import api from "../api/axiosClient";

export default function DeleteUserModal({
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
  const removeUser = async () => {
    await api.delete(`/users/${user.id}`);
    refresh();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete User</ModalHeader>
        <ModalBody>
          <Text>Are you sure you want to delete {user?.name}?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={removeUser}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
