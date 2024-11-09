"use client";

import Image from "next/image";
import { EditProfileDialog } from "./edit-profile-dialog";
import { useGetMyProfile } from "../../api/get-my-profile";

export default function PageProfile() {
  const { data } = useGetMyProfile({});

  return (
    <div className="h-full flex flex-col items-center justify-center gap-9">
      <Image
        src={data?.profile_picture ?? "/default-profile-picture.jpg"}
        alt="profile picture"
        className="rounded-full shadow-lg dark:shadow-zinc-400"
        width={200}
        height={200}
      />
      <h1 className="text-4xl font-bold">Hi, {data?.name}!</h1>
      <EditProfileDialog />
    </div>
  );
}
