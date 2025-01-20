"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const fetchStudentsInCourse = async () => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classroom`,
      method: "GET",
      nextOption: {
        next: { tags: ["list-classroom"] },
      },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchStudentsInCourse failed:", error);
    throw error;
  }
};

export const addStudentsToCourse = async (data: any) => {
  const enrichedData = data.map((item: any) => ({
    ...item,
    leader_code: "",
    foreign_students: [],
  }));

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classroom/students`,
    method: "POST",
    // headers: {
    //   Authorization: Bearer ${session?.user?.access_token},
    // },
    body: enrichedData,
  });
  revalidateTag("list-students-in-classroom");

  return res;
};
