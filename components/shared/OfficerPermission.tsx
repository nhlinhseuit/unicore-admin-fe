import { getPermissionLabel } from "@/lib/utils";
import { OfficerPermissionDataItem } from "@/types";
import { useState } from "react";
import UserInfoWithEmail from "../courses/UserInfoWithEmail";
import BorderContainer from "./BorderContainer";
import Divider from "./Divider";

interface Props {
  dataItem: OfficerPermissionDataItem;
}
const OfficerPermission = (params: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    Object.entries(params.dataItem.permissions)
      .filter(([key, value]) => value) // Lọc các key có value là true
      .map(([key]) => key) // Chỉ lấy key
  );

  const handleCategoryChange = (key: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(key)
          ? prev.filter((item) => item !== key) // Loại bỏ `key` nếu đã tồn tại
          : [...prev, key] // Thêm `key` nếu chưa tồn tại
    );
  };

  return (
    <BorderContainer otherClasses="p-6 mt-4">
      <div>
        <UserInfoWithEmail
          name={params.dataItem.name}
          email={params.dataItem.email}
        />

        <Divider otherClasses="mt-2 mb-4 !h-[1.3px] !bg-gray-200" />

        <div className="mt-4 mx-3 w-full">
          <div className="flex gap-8 flex-wrap">
            {Object.entries(params.dataItem.permissions).map(([key, value]) => (
              <div
                key={key}
                className="flex gap-2 items-center flex-grow-0 flex-shrink basis-[calc(50%-16px)]"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(key)}
                  onChange={() => handleCategoryChange(key)}
                  className="w-4 h-4 cursor-pointer"
                />
                <p className="body-regular text-dark200_light900 m-0 whitespace-normal break-words">
                  {getPermissionLabel(key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BorderContainer>
  );
};

export default OfficerPermission;
