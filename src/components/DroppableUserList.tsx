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
    <div
      className="bg-white rounded-xl shadow-lg flex flex-col"
      ref={setNodeRef}
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
      </div>

      <UserList users={users} containerId={id} />

      {users.length === 0 && (
        <div>
          <p className="text-center text-lg font-semibold">
            {isOver ? "Suelta aquí" : "Sin usuarios seleccionados"}
          </p>
        </div>
      )}
    </div>
  );
};
