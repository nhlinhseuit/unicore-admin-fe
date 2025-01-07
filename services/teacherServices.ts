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

  console.log('handleCreateTeachersAction')

  console.log('data', data)
  
  // const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/profile/teachers/bulk`,
    method: "POST",
    // headers: {
      //   Authorization: `Bearer ${session?.user?.access_token}`,
      // },
      body: { ...data },
    });

    console.log('res', res)

  revalidateTag("list-teachers");

  return res;
};

// export const handleUpdateSubjectAction = async (data: any) => {
//   const { id, ...rest } = data; // Separate id from the rest of the data

//   // Send the PATCH request to update supplier by ID in the URL path
//   const res = await sendRequest<IBackendRes<any>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/users/${id}`, // Include ID directly in the path
//     method: 'PATCH',
//     body: { ...rest },
//     // headers: {
//     //   Authorization: `Bearer ${session?.user?.access_token}`, // Uncomment if authentication is needed
//     // },
//   });

//   // Revalidate to update the list view if necessary
//   revalidateTag('list-teachers');

//   return res;
// };

// export const handleDeleteSubjectAction = async (id: any) => {
//   // const session = await auth();
//   const res = await sendRequest<IBackendRes<any>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/users/${id}`,
//     method: 'DELETE',
//     // headers: {
//     //   Authorization: `Bearer ${session?.user?.access_token}`,
//     // },
//   });
//   revalidateTag('list-teachers');
//   return res;
// };
