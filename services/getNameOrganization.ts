"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";

export const getNameOrganization = async (organization_id: string) => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organization/manage/${organization_id}`,
      method: "GET",
      nextOption: {
        next: { tags: ["name-organization"] },
      },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("DgetNameOrganization error");
    }
  } catch (error) {
    console.error("getNameOrganization failed:", error);
    throw error;
  }
};
