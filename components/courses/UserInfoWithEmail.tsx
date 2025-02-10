import React from "react";
import SmallAvatar from "./SmallAvatar";
import { getAvatarName } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  email: string;
}

const UserInfoWithEmail = (params: Props) => {
  return (
    <div className="flex pl-2 gap-4 ">
      <SmallAvatar text={getAvatarName(params.name)} />
      <div>
        <p className="small-regular">{params.name}</p>
        <p className="mt-1 small-regular">{params.id}</p>
        <p className="mt-1 small-regular underline">{params.email}</p>
      </div>
    </div>
  );
};

export default UserInfoWithEmail;
