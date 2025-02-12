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

export const editAnnoucement = async (annoucementId: string, data: any) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/update/${annoucementId}`,
    method: "PUT",
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
    console.log(
      "`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/class`",
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/class`
    );

    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/class`,
      method: "GET",
      queryParams: { class_id: classId },
      nextOption: {
        next: { tags: ["list-annoucements"] },
      },
    });

    if (res?.data) {
      console.log("res.data::", res);
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchAnnoucements failed:", error);
    throw error;
  }
};

export const fetchDetailAnnoucement = async (postId: string) => {
  try {

  const res = await fetch(`http://3.107.202.61:8080/api/v1/post/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("res fetchDetailAnnoucement", res);

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  const data = await res.json();
  return data; // Trả về dữ liệu từ API
} catch (error) {
  console.error("fetchComments failed:", error);
  throw error;
}
};
