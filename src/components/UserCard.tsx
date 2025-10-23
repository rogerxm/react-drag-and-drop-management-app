import { Link } from "react-router";
import type { User } from "../types/user";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const fullName = `${user.name.first} ${user.name.last}`;
  const profileImage = user.picture.medium;
  const userEmail = user.email;

  return (
    <Link to={`/users/${user.id}`}>
      <img src={profileImage} alt={fullName} />

      <div>
        <h4>{fullName}</h4>

        <p>{userEmail}</p>
      </div>
    </Link>
  );
};
