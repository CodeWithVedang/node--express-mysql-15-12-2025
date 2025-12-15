import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { Table, Thead, Tr, Th, Tbody, Td, Heading } from "@chakra-ui/react";

export default function LoginLogs() {
  const [logs, setLogs] = useState([]);

  const load = async () => {
    const res = await api.get("/auth/logs");
    setLogs(res.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Heading mb={5}>Login Logs</Heading>

      <Table>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Login</Th>
            <Th>Logout</Th>
          </Tr>
        </Thead>
        <Tbody>
          {logs.map((l: any) => (
            <Tr key={l.id}>
              <Td>{l.username}</Td>
              <Td>{l.login_time}</Td>
              <Td>{l.logout_time || "—"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
