import { CentralizedExamDataItem, QAandProjectExamDataItem } from "@/types";

export const convertToAPIDataTableCentralizedExam = ({
  data,
  isMidterm,
}: {
  data: CentralizedExamDataItem[];
  isMidterm: boolean;
}) => {
  // const temp = {
  //   midterm: false,
  //   schedules: [
  //     {
  //       date: "08-01-2025",
  //       session: "1",
  //       room: "2",
  //       semester: 1,
  //       year: 2022,
  //       class_code: "IT001.CLC",
  //       day_of_week: 2,
  //     },
  //   ],
  // };

  const schedules = data
    .map((item) => item.data)
    .map((item) => ({
      date: item["Ngày thi"],
      session: item["Ca Thi"],
      room: item["Phòng Thi"],
      semester: item["Học kỳ"],
      year: item["Năm học"],
      class_code: item["Mã lớp"],
      day_of_week: parseInt(item["Thứ"], 10),
    }));

  return {
    midterm: isMidterm,
    schedules: schedules,
  };
};

export const convertToAPIDataTableQAandProjectExam = ({
  data,
  isMidterm,
}: {
  data: QAandProjectExamDataItem[];
  isMidterm: boolean;
}) => {
  // const temp = {
  //   midterm: false,
  //   schedules: [
  //     {
  //       date: "08-01-2025",
  //       session: "1",
  //       room: "2",
  //       semester: 2,
  //       year: 2023,
  //       class_code: "SE113.O21.PMCL",
  //       day_of_week: 2,
  //     },
  //   ],
  // };

  const schedules = data
    .map((item) => item.data)
    .map((item) => ({
      date: item["Ngày thi"],
      session: item["Tiết"],
      room: item["Phòng Thi"],
      semester: item["Học kỳ"],
      year: item["Năm học"],
      class_code: item["Mã lớp"],
      day_of_week: parseInt(item["Thứ"], 10),
    }));

  return {
    midterm: isMidterm,
    schedules: schedules,
  };
};
