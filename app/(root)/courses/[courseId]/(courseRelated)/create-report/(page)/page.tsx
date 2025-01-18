"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import NavigateButton from "@/components/shared/Button/NavigateButton";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  sCompletedReportSchedule,
  sDateEnd,
  sDateStart,
  sReportOptions,
  sSelectedSettingOption,
  sSubmitReportSchedule,
  sTimeEnd,
  sTimeStart,
} from "../(store)/createReportStore";
import ReportInfo from "../ReportInfo";
import ReportSchedule from "../ReportSchedule";

const CreateReport = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();
  const pathName = usePathname();

  const handleClick = () => {
    const newPath = pathName.substring(0, pathName.lastIndexOf("/"));
    router.push(newPath);

    sReportOptions.reset();
    sDateStart.reset();
    sTimeStart.reset();
    sDateEnd.reset();
    sTimeEnd.reset();
    sSelectedSettingOption.reset();
    sSubmitReportSchedule.reset();
    sCompletedReportSchedule.reset();
  };

  return (
    <>
      <div className="flex gap-4 items-center relative">
        <BackToPrev
          text={"Quay lại danh sách thông báo"}
          onClickPrev={handleClick}
          otherClasses={"mt-6"}
        />
      </div>

      <div>
        <ReportInfo />
      </div>
    </>
  );
};

export default CreateReport;
