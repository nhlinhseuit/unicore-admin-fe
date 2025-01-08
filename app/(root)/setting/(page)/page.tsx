"use client";
import BorderContainer from "@/components/shared/BorderContainer";
import ToggleTitle from "@/components/shared/ToggleTitle";
import { useState } from "react";

import SubmitButton from "@/components/shared/Button/SubmitButton";
import { Input } from "@/components/ui/input";
import {
  mockDataOfficerDepartmentPermissions,
  mockDataOfficerPermissions,
} from "@/mocks";
import OfficerPermission from "@/components/shared/OfficerPermission";

const Setting = () => {
  const [isToggleShowCourseSetting, setIsToggleShowCourseSetting] =
    useState(true);
  const [isToggleGeneralSetting, setIsToggleGeneralSetting] = useState(true);
  const [defaultPassword, setDefaultPassword] = useState("1");
  const [scoreCourse, setScoreCourse] = useState("0.5");
  const [scoreAverage, setScoreAverage] = useState("0.1");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <ToggleTitle
          text="Cài đặt chung"
          handleClick={() => {
            setIsToggleGeneralSetting(!isToggleGeneralSetting);
          }}
          value={isToggleGeneralSetting}
        />
        {isToggleGeneralSetting ? (
          <div className="mx-6 pl-6 flex flex-col gap-20">
            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                1. Tài khoản
              </label>
              <BorderContainer otherClasses="p-6 mt-4 flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                    - Mật khẩu mặc định khi tạo tài khoản
                  </label>
                  <div>
                    <Input
                      value={defaultPassword}
                      onChange={(e) => {
                        setDefaultPassword(e.target.value);
                      }}
                      placeholder="Nhập điểm..."
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[40px] border"
                    />
                  </div>
                </div>
              </BorderContainer>
            </div>

            <div>
              <SubmitButton text="Lưu cài đặt lớp" />
            </div>
          </div>
        ) : null}

        <ToggleTitle
          text="Cài đặt lớp"
          handleClick={() => {
            setIsToggleShowCourseSetting(!isToggleShowCourseSetting);
          }}
          value={isToggleShowCourseSetting}
        />
        {isToggleShowCourseSetting ? (
          <div className="mx-6 pl-6 flex flex-col gap-20">
            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                1. Quy tắc làm tròn số
              </label>
              <BorderContainer otherClasses="p-6 mt-4 flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                    - Điểm lớp làm tròn lên:
                  </label>
                  <div>
                    <Input
                      value={scoreCourse}
                      onChange={(e) => {
                        setScoreCourse(e.target.value);
                      }}
                      placeholder="Nhập điểm..."
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[40px] border"
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                    - Điểm trung bình làm tròn lên:
                  </label>
                  <div>
                    <Input
                      value={scoreAverage}
                      onChange={(e) => {
                        setScoreAverage(e.target.value);
                      }}
                      placeholder="Nhập điểm..."
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[40px] border"
                    />
                  </div>
                </div>
              </BorderContainer>
            </div>

            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                2. Phân quyền giáo vụ
              </label>
              <div className="flex gap-4">
                {mockDataOfficerDepartmentPermissions.map(
                  (item: any, index) => (
                    <OfficerPermission key={index} dataItem={item} />
                  )
                )}
              </div>
            </div>

            <div>
              <SubmitButton text="Lưu cài đặt lớp" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Setting;
