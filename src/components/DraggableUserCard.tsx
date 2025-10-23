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
    <div ref={setNodeRef}>
      <img src={profileImage} alt={fullName} {...listeners} {...attributes} />

      <Link to={`/users/${user.id}`}>
        <div>
          <h4>{fullName}</h4>
          <p>{userEmail}</p>
        </div>
      </Link>
    </div>
  );
};
