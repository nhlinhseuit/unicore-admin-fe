"use client";
import BackToPrev from "@/components/shared/BackToPrev";
import CreateAnnouncement from "@/components/shared/PostItem/CreateAnnoucement";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const router = useRouter();
  const pathName = usePathname();

  // Lấy id từ query string
  const searchParams = useSearchParams();
  const announcementId = searchParams.get("id");

  const handleClick = () => {
    const newPath = pathName.substring(0, pathName.lastIndexOf("/"));
    console.log("newPath", newPath);
    router.push(newPath);
  };

  return (
    <div>
      <BackToPrev
        text={"Quay lại danh sách thông báo"}
        onClickPrev={handleClick}
      />
      <CreateAnnouncement isEdit announcementId={announcementId ?? ""} />;
    </div>
  );
};

export default page;
