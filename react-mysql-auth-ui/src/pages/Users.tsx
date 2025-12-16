  import { useEffect, useState } from "react";
  import api from "../api/axiosClient";
  import {
    Button, SimpleGrid, Heading, useDisclosure
  } from "@chakra-ui/react";

  import AddUserModal from "../components/AddUserModal";
  import EditUserModal from "../components/EditUserModal";
  import DeleteUserModal from "../components/DeleteUserModal";
  import Pagination from "../components/Pagination";

  export default function Users() {
    const [users, setUsers] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotal] = useState(1);

    const addModal = useDisclosure();
    const editModal = useDisclosure();
    const deleteModal = useDisclosure();

    const [selectedUser, setSelectedUser] = useState<any>(null);

    const load = async () => {
      const res = await api.get(`/users?page=${page}&limit=6`);

      const arr = res.data.data || [];

      setUsers(arr);
      setTotal(res.data.totalPages || 1);
    };

    useEffect(() => {
      load();
    }, [page]);

    return (
      <>
        <Heading mb={5}>Users</Heading>

        <Button onClick={addModal.onOpen} colorScheme="blue">Add User</Button>

        <SimpleGrid columns={[1, 2, 3]} spacing={5} mt={5}>
          {users.map((u) => (
            <Button
              key={u.id}
              p={5}
              onClick={() => {
                setSelectedUser(u);
                editModal.onOpen();
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                setSelectedUser(u);
                deleteModal.onOpen();
              }}
            >
              {u.name} — {u.role}
            </Button>
          ))}
        </SimpleGrid>

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />

        <AddUserModal isOpen={addModal.isOpen} onClose={addModal.onClose} refresh={load} />
        {selectedUser && (
          <EditUserModal
            isOpen={editModal.isOpen}
            onClose={editModal.onClose}
            user={selectedUser}
            refresh={load}
          />
        )}
        {selectedUser && (
          <DeleteUserModal
            isOpen={deleteModal.isOpen}
            onClose={deleteModal.onClose}
            user={selectedUser}
            refresh={load}
          />
        )}
      </>
    );
  }
