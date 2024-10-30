import Image from "next/image";
import { FC } from "react";

type UserAvatarProps = {
  user: string;
  isLoading?: boolean;
};

const UserAvatar: FC<UserAvatarProps> = ({ user, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="size-10 animate-pulse rounded-full bg-neutral-200/60 dark:bg-lightGray/10" />
      ) : (
        <Image
          src={user!}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </>
  );
};

export default UserAvatar;
