"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const fetchOfficer = async () => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/profile/staff`,
      method: "GET",
      nextOption: {
        next: { tags: ["list-officers"] },
      },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchOfficer failed:", error);
    throw error;
  }
};

export const handleCreateOfficerAction = async (data: any) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/profile/staff/bulk`,
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });
  revalidateTag("list-officers");

  return res;
};
export const handleEditOfficerAction = async (data: any) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/profile/staff/bulk`,
    method: "PUT",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });
  revalidateTag("list-officers");

  return res;
};

