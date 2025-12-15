import { HStack, Button } from "@chakra-ui/react";

export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  return (
    <HStack spacing={2} mt={5}>
      <Button onClick={() => onChange(page - 1)} isDisabled={page === 1}>
        Prev
      </Button>
      <Button>{page}</Button>
      <Button
        onClick={() => onChange(page + 1)}
        isDisabled={page === totalPages}
      >
        Next
      </Button>
    </HStack>
  );
}
