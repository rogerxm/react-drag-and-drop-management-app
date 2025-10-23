import type { User } from "../types/user";
import { DraggableUserCard } from "./DraggableUserCard";

interface UserListProps {
  users: User[];
  containerId: string;
}

export const UserList = ({ users, containerId }: UserListProps) => {
  return (
    <div>
      {/* Mapear y renderizar las UserCard */}
      {users.map((user) => (
        <DraggableUserCard
          key={user.id}
          user={user}
          containerId={containerId}
        />
      ))}
    </div>
  );
};
