"use client";

import AnnouncementDetail from "@/components/announcements/AnnouncementDetail";
import PostItem from "@/components/shared/PostItem/PostItem";
import { mockAnnouncementDetailLists } from "@/mocks";
import { fetchDetailAnnoucement } from "@/services/announcementServices";
import { IAnnouncementResponseData } from "@/types/entity/Annoucement";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const question: any = mockAnnouncementDetailLists[0];
  const pathName = usePathname();

  const [item, setItem] = useState<IAnnouncementResponseData>()

  useEffect(() => {
    const postId = pathName.split("/").pop();
    if (postId) {
      fetchDetailAnnoucement(postId).then((data) => {
        console.log("data ", data);
        setItem(data.data)
      });
    }
  }, []);

  return (
    <div className="mt-12 flex flex-col gap-12">
      <p className="paragraph-semibold">
        Chi tiết thông báo lớp Đồ án 1 - SE121.O21.PMCl
      </p>
      <AnnouncementDetail
        key={question._id}
        _id={question._id}
        title={question.title}
        description={question.description}
        tags={question.tags}
        files={question.files}
        author={question.author}
        createdAt={question.createdAt}
      />

{item ? 
<PostItem
                    key={item.id}
                    id={item.id}
                    creator={item.create_by}
                    createdAt={item.created_date}
                    title={item.name}
                    desc={item.description}
                    fileName={""}
                    // comments={}
                  />: null}
    </div>
  );
};

export default page;
