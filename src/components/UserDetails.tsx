"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const UserDetails = ({ open }: { open: boolean }) => {
  const { data, status } = useSession();
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-fit p-2">
        <Image
          src={data?.user?.image as string}
          width={60}
          height={60}
          alt=""
          className="aspect-square rounded-full border border-darkGray"
        />
      </div>
      {open && (
        <div className="flex flex-col items-start justify-center">
          <span className="text-lg font-medium leading-snug">
            {data?.user?.name}
          </span>
          <span className="truncate text-sm leading-snug opacity-80">
            {data?.user?.email}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
