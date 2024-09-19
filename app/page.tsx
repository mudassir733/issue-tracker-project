import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Table } from "@radix-ui/themes";

export default function Home() {
  return (
<>
<div className="px-6 mt-28">
<Table.Root variant="surface" className="mb-6">
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    <Table.Row>
      <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
      <Table.Cell>danilo@example.com</Table.Cell>
      <Table.Cell>Developer</Table.Cell>
      <Table.Cell>Developer</Table.Cell>
    </Table.Row>

    <Table.Row>
      <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
      <Table.Cell>zahra@example.com</Table.Cell>
      <Table.Cell>Admin</Table.Cell>
      <Table.Cell>Admin</Table.Cell>
    </Table.Row>

    <Table.Row>
      <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
      <Table.Cell>jasper@example.com</Table.Cell>
      <Table.Cell>Developer</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
<Button><Link href="/issues/new">New Issue</Link></Button>
</div>

</>
  );
}
