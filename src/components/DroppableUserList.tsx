import { useDroppable } from "@dnd-kit/core";
import { UserList } from "./UserList";
import type { User } from "../types/user";

interface DroppableUserListProps {
  id: string;
  title: string;
  users: User[];
}

export const DroppableUserList = ({
  id,
  title,
  users,
}: DroppableUserListProps) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef}>
      <h3>{title}</h3>

      <UserList users={users} containerId={id} />
      {users.length === 0 && <p>{isOver ? "Suelta aquí" : "Lista vacía"}</p>}
    </div>
  );
};
