"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const createAnnoucement = async (data: any) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/class/create`,
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });
  revalidateTag("create-annoucement");

  return res;
};

export const fetchAnnoucements = async (classId: string) => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      // url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/class?class_id=${classId}`,
      url: `http://3.107.202.61:8080/api/v1/post/class?class_id=677fefdd854d3e02e4191707`,
      method: "GET",
      nextOption: {
        next: { tags: ["list-annoucements"] },
      },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchAnnoucements failed:", error);
    throw error;
  }
};


