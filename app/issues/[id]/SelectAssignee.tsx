"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SelectAssignee = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;
  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "unassigned"}
      onValueChange={(userId) => {
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId === "unassigned" ? null : userId || null,
        });
      }}
    >
      <Select.Trigger placeholder="Assign to" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectAssignee;