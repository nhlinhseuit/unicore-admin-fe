"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const fetchTeachers = async () => {
  try {
    //TODO: có thể bỏ type ISubject vào any ở đây
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/profile/teachers`,
      method: "GET",
      nextOption: {
        next: { tags: ["list-teachers"] },
      },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchTeachers failed:", error);
    throw error;
  }
};

export const handleCreateTeachersAction = async (data: any) => {

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/profile/teachers/bulk`,
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });

  console.log("res", res);

  revalidateTag("list-teachers");

  return res;
};

export const handleEditTeachersAction = async (data: any) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/profile/teachers/bulk`,
    method: "PUT",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });

  console.log("res", res);

  revalidateTag("list-teachers");

  return res;
};

