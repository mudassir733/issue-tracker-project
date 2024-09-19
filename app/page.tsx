"use client"
import { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Table } from "@radix-ui/themes";
import axios from "axios";

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string; 
}

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const res = await axios.get('/api/issues');
        if (res.status === 200) {
          const fetchedIssues = res.data.map((issue: Issue) => ({
            ...issue,
            createdAt: new Date(issue.createdAt), 
          }));
          setIssues(fetchedIssues);
        } else {
          setError("Failed to load issues");
        }
      } catch (err) {
        console.error("Error fetching issues:", err);
        setError("Failed to load issues");
      }
    }

    fetchIssues();
  }, []); 

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>{issue.title}</Table.Cell>
                <Table.Cell>{issue.description}</Table.Cell>
                <Table.Cell>{new Date(issue.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{issue.status}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
    </>
  );
}
