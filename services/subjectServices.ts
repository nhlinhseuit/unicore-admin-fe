'use server';

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from '@/utils/api';
import { revalidateTag } from 'next/cache';

export const fetchSubjects = async (
  url: string,
  current: number,
  pageSize: number,
  groupId: number,
  searchName?: string,
  searchPhone?: string,
) => {
  const queryParams: { [key: string]: any } = {
    current,
    pageSize,
    groupId,
  };

  if (searchName) queryParams.name = searchName;
  if (searchPhone) queryParams.phone = searchPhone;

  try {
    const res = await sendRequest<IBackendRes<any>>({
      url,
      method: 'GET',
      queryParams,
      nextOption: {
        next: { tags: ['list-subjects'] },
      },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error('Fetch suppliers failed:', error);
    throw error;
  }
};

export const handleCreateSubjectAction = async (data: any) => {
  // const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organization/subjects/bulk`,
    method: 'POST',
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });
  revalidateTag('list-subjects');

  return res;
};

export const handleUpdateSubjectAction = async (data: any) => {
  const { id, ...rest } = data; // Separate id from the rest of the data

  // Send the PATCH request to update supplier by ID in the URL path
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/users/${id}`, // Include ID directly in the path
    method: 'PATCH',
    body: { ...rest },
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`, // Uncomment if authentication is needed
    // },
  });

  // Revalidate to update the list view if necessary
  revalidateTag('list-subjects');

  return res;
};

export const handleDeleteSubjectAction = async (id: any) => {
  // const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/users/${id}`,
    method: 'DELETE',
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
  });
  revalidateTag('list-subjects');
  return res;
};
