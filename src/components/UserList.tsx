import type { User } from "../types/user";
import { UserCard } from "./UserCard";

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  return (
    <div>
      {/* Mapear y renderizar las UserCard */}
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
