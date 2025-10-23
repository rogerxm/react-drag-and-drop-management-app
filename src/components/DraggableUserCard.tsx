import { useDraggable } from "@dnd-kit/core";
import type { User } from "../types/user";
import { Link } from "react-router";

export interface DraggableUserCardProps {
  user: User;
  containerId: string;
}

export const DraggableUserCard = ({
  user,
  containerId,
}: DraggableUserCardProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: user.id,
    data: { user, containerId },
  });

  const fullName = `${user.name.first} ${user.name.last}`;
  const profileImage = user.picture.medium;
  const userEmail = user.email;

  return (
    <div
      className="p-4 my-4 bg-white rounded-lg shadow border border-gray-200 flex gap-2 items-center transition-shadow hover:shadow-lg overflow-auto"
      ref={setNodeRef}
    >
      <img
        className="w-12 h-12 md:w-20 md:h-20 rounded-full"
        src={profileImage}
        alt={fullName}
        {...listeners}
        {...attributes}
      />

      <Link
        className="p-2 rounded-md hover:bg-gray-50"
        to={`/users/${user.id}`}
      >
        <div>
          <h4 className="font-semibold text-gray-800 text-sm md:text-base">
            {fullName}
          </h4>
          <p className="text-xs md:text-sm text-gray-500">{userEmail}</p>
        </div>
      </Link>
    </div>
  );
};
