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

  const listStyle = `flex-grow overflow-y-auto p-4 rounded-b-xl transition-colors ${
    isOver ? "bg-blue-100" : "bg-white"
  }`;

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
      </div>

      <div className={listStyle} ref={setNodeRef}>
        {users.length > 0 ? (
          <UserList users={users} containerId={id} />
        ) : (
          <div>
            <p className="text-center text-lg font-semibold">
              {isOver ? "Suelta aquí" : "Sin usuarios seleccionados"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
