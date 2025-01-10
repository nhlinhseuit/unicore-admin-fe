import { addStudentsToCourse } from "@/services/importStudentsInCourseServices";
import { StudentDataItem } from "@/types";
import { Table } from "flowbite-react";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import BorderContainer from "../../BorderContainer";
import IconButton from "../../Button/IconButton";
import LoadingComponent from "../../LoadingComponent";
import NoteComponent from "../../NoteComponent";
import ErrorComponent from "../../Status/ErrorComponent";
import { tableTheme } from "../components/DataTable";
import { CourseType } from "@/types/entity/Course";

type TransformedDataItem = {
  type: string;
  STT: string | number;
  isDeleted: boolean;
  data: {
    MSSV: string;
    "Họ và tên": string;
    Email: string;
    "GV hướng dẫn": string;
    "Thông tin liên lạc": string;
    "Nơi thực tập (tên DN)": string;
    "Nội dung thực tập": string;
    "Vị trí thực tập": string;
    "Ngày bắt đầu": string;
    "Ngày kết thúc": string;
    "Điểm đánh giá của DN": string;
    "Ghi chú": string;
  };
};

const transformedData: TransformedDataItem[] = [];

export default function ImportStudentsListInCourse() {
  let count = 0;

  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [dataTables, setDataTables] = useState<
    Record<string, StudentDataItem[]>
  >({});

  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<
    Record<string, { name: string; file: File | null }>
  >({});

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleButtonClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleStudentFileUpload = (
    e: any,
    courseId: string,
    courseCode: string
  ) => {
    console.log("courseCode", courseCode);

    const file = e.target.files[0];

    setIsLoading(true);
    setErrorMessages([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      let errorMessages: string[] = [];

      //! Lấy dòng đầu tiên (title) từ sheet
      // Lấy toàn bộ sheet dưới dạng mảng 2 chiều
      const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Kiểm tra dòng tiêu đề (titleRow)
      const titleRow = rows[0];

      console.log("titleRow", titleRow);

      if (!titleRow || !titleRow[0]) {
        setErrorMessages(["File Excel không chứa tiêu đề hoặc bị lỗi."]);
        setIsLoading(false);
        return;
      }

      const title = titleRow[0];
      if (!title.includes(courseCode)) {
        setErrorMessages([
          `Import nhầm lớp. Vui lòng kiểm tra lại danh sách!.`,
        ]);
        if (file) {
          setUploadedFileName((prevData: any) => ({
            ...prevData,
            [courseId]: { name: "Import lỗi", file: null },
          }));
        }
        setIsLoading(false);
        return;
      }

      //TODO: không lỗi

      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 1,
        defval: "",
      });

      const transformedData = parsedData.map((item: any, index: number) => {
        const requiredFields = {
          MSSV: item["MSSV"],
          "Họ và tên": item["Họ và tên SV"],
          SDT: item["Điện thoại"],
          Email: item["Email"],
          "Lớp sinh hoạt": item["Lớp sinh hoạt"],
          "Giới tính": item["Giới tính"],
          "Địa chỉ": item["Địa chỉ"],
          "Ngày sinh": item["Ngày sinh"],
        };

        if (index === 0) {
          Object.entries(requiredFields).forEach(([fieldName, value]) => {
            if (value === undefined) {
              errorMessages.push(`Trường "${fieldName}" bị thiếu hoặc lỗi.`);

              if (file) {
                setUploadedFileName((prevData: any) => ({
                  ...prevData,
                  [courseId]: { name: "Import lỗi", file: null },
                }));
              }
            }
          });
        }

        return {
          type: "student",
          STT: item.STT,
          isDeleted: false,
          data: requiredFields,
        };
      });

      if (errorMessages.length > 0) {
        setErrorMessages(errorMessages);
      } else {
        setDataTables((prevData: any) => ({
          ...prevData,
          [courseId]: transformedData,
        }));
        if (file) {
          setUploadedFileName((prevData) => ({
            ...prevData,
            [courseId]: {
              name: file.name,
              file: file, // Lưu cả file
            },
          }));
        }
      }

      setIsLoading(false);
    };
  };

  const handleStudentInternCourseFileUpload = (
    e: any,
    courseId: string,
    courseCode: string
  ) => {
    const file = e.target.files[0];

    setIsLoading(true);
    setErrorMessages([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      //! Lấy dòng đầu tiên (title) từ sheet
      // Lấy giá trị ô E6 (cột E, hàng 6)
      const cellE6 = sheet["E6"]?.v || ""; // `.v` để lấy giá trị ô
      console.log("cellE6", cellE6);

      // Kiểm tra xem cellE6 có chứa mã lớp (courseCode) không
      if (!cellE6.includes(courseCode)) {
        setErrorMessages([
          `Import nhầm lớp. Vui lòng kiểm tra lại danh sách! (Ô E6 không chứa mã lớp ${courseCode}).`,
        ]);
        if (file) {
          setUploadedFileName((prevData: any) => ({
            ...prevData,
            [courseId]: { name: "Import lỗi", file: null },
          }));
        }
        setIsLoading(false);
        return;
      }

      //TODO: không lỗi

      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 8,
        defval: "",
      });

      let errorMessages: string[] = [];
      const transformedData: TransformedDataItem[] = [];

      for (const item of parsedData as any[]) {
        //? Kiểm tra nếu STT và MSSV đều trống, dừng việc xử lý
        //? Có có các dòng cán bộ coi  thi... thừa ở dưới
        if (!item.STT && !item["Mã số SV"]) {
          break; // Dừng vòng lặp
        }

        const requiredFields = {
          MSSV: item["Mã số SV"],
          "Họ và tên": item["Họ và tên sinh viên"],
          Email: item["Email sinh viên"],
          "GV hướng dẫn": item["GV hướng dẫn"],
          "Thông tin liên lạc": item["Thông tin liên lạc"],
          "Nơi thực tập (tên DN)": item["Nơi thực tập (tên DN)"],
          "Nội dung thực tập": item["Nội dung thực tập"],
          "Vị trí thực tập": item["Vị trí thực tập"],
          "Ngày bắt đầu": item["Ngày bắt đầu"],
          "Ngày kết thúc": item["Ngày kết thúc"],
          "Điểm đánh giá của DN": item["Điểm đánh giá của DN"],
          "Ghi chú": item["Ghi chú"],
        };

        // Kiểm tra các trường quan trọng
        if (transformedData.length === 0) {
          Object.entries(requiredFields).forEach(([fieldName, value]) => {
            if (value === undefined) {
              errorMessages.push(`Trường "${fieldName}" bị thiếu hoặc lỗi.`);

              if (file) {
                setUploadedFileName((prevData: any) => ({
                  ...prevData,
                  [courseId]: { name: "Import lỗi", file: null },
                }));
              }
            }
          });
        }

        transformedData.push({
          type: "student",
          STT: item.STT,
          isDeleted: false,
          data: requiredFields,
        });
      }

      if (transformedData.length === 0) {
        errorMessages.push(
          "Import lỗi. Vui lòng chọn đúng file import sinh viên lớp Thực tập doanh nghiệp!"
        );
        if (file) {
          setUploadedFileName((prevData: any) => ({
            ...prevData,
            [courseId]: { name: "Import lỗi", file: null },
          }));
        }
      }

      if (errorMessages.length > 0) {
        setErrorMessages(errorMessages);
      } else {
        setDataTables((prevData: any) => ({
          ...prevData,
          [courseId]: transformedData,
        }));
        if (file) {
          setUploadedFileName((prevData) => ({
            ...prevData,
            [courseId]: {
              name: file.name,
              file: file, // Lưu cả file
            },
          }));
        }
      }

      setIsLoading(false);
    };
  };

  const addStudentsToCourseAPI = () => {
    console.log("dataTables", dataTables);

    const dataAPI = Object.entries(dataTables).map(([classId, students]) => {
      const studentCodes = students.map((student) => student.data.MSSV);

      //? Nếu đã có ds sinh viên thì trả lỗi exist, không có gì hết

      return {
        class_id: "677cd4ae0a706479b8773770", // Sử dụng key làm class_id
        subclass_code: "SE113.O21.PMCL",
        leader_code: null, // Mặc định để rỗng
        student_codes: studentCodes, // Danh sách MSSV
      };
    });

    console.log("dataAPI", dataAPI);

    setIsLoading(true);
    addStudentsToCourse(dataAPI).then((data) => {
      console.log("data", data);
      setIsLoading(false);
    });
  };

  const notImportStudentCoursesList = [
    {
      id: "677fefdd854d3e02e419170a",
      code: "SE122.O21.PMCL",
      name: "Đồ án 2",
      type: "NOR",
    },
    {
      id: "677fefdd854d3e02e4191712",
      code: "SE501.O21.PMCL",
      name: "Thực tập tốt nghiệp",
      type: "TTTN",
    },
    {
      id: "677fefdd854d3e02e4191706",
      code: "SE113.O21.PMCL",
      name: "Kiểm chứng phần mềm",
    },
    {
      id: "677fefdd854d3e02e4191711",
      code: "SE405.O22.PMCL",
      name: "Chuyên đề Mobile and Pervasive Computing",
      type: "NOR",
    },
  ];

  return (
    <div>
      {isLoading ? <LoadingComponent /> : null}

      {errorMessages.length > 0 && (
        <div className="mb-6">
          {errorMessages.map((item, index) => (
            <ErrorComponent
              key={`${item}_${index}`}
              text={item}
              onClickClose={() => {
                setErrorMessages((prevErrors) =>
                  prevErrors.filter((_, i) => i !== index)
                );
              }}
            />
          ))}
        </div>
      )}

      <NoteComponent
        text="- Lớp thực tập doanh nghiệp phải được import danh sách sinh viên có
        Giảng viên hướng dẫn như template bên dưới."
      />

      <BorderContainer otherClasses="p-6 flex flex-col gap-4">
        <p className="paragraph-semibold">
          Template import danh sách sinh viên
        </p>
        <a
          href="/assets/template_import_danh_sach_sinh_vien_lop.xlsx"
          download
          className="text-blue-500 underline text-base italic"
        >
          Tải xuống template file import sinh viên lớp
        </a>
        <a
          href="/assets/template_import_danh_sach_sinh_vien_lop_TTDN.xlsx"
          download
          className="text-blue-500 underline text-base italic"
        >
          Tải xuống template file import sinh viên lớp Thực tập doanh nghiệp và
          chia lớp với GVHD
        </a>
      </BorderContainer>

      {/* TABLE */}
      <div
        className="
          mt-4
          scroll-container 
          overflow-auto
          max-w-full
          h-fit
          rounded-lg
          border-[1px]
          border-secondary-200
          "
      >
        <Table theme={tableTheme}>
          {/* HEADER */}
          <Table.Head
            theme={tableTheme?.head}
            className="sticky top-0 z-10 uppercase border-b bg-gray"
          >
            <Table.HeadCell
              theme={tableTheme?.head?.cell}
              className={`text-center w-10 border-r-[1px] uppercase`}
            >
              STT
            </Table.HeadCell>

            <Table.HeadCell
              theme={tableTheme?.head?.cell}
              className={` w-10 border-r-[1px] uppercase`}
            >
              Mã lớp
            </Table.HeadCell>

            <Table.HeadCell
              theme={tableTheme?.head?.cell}
              className={` w-10 border-r-[1px] uppercase`}
            >
              Tên môn
            </Table.HeadCell>

            <Table.HeadCell
              theme={tableTheme?.head?.cell}
              className={`w-16 border-r-[1px] uppercase !py-0 !my-0`}
            >
              Import file
            </Table.HeadCell>
          </Table.Head>

          {/* BODY */}
          <Table.Body className="text-left divide-y">
            {notImportStudentCoursesList.map((dataItem, index) => (
              <Table.Row
                key={count}
                onClick={() => {}}
                className={`${
                  dataItem.type === CourseType.InternCourse
                    ? "bg-[#fef5e5]"
                    : "bg-background-secondary"
                }  text-left duration-100
                  `}
              >
                {/* STT */}
                <Table.Cell className="text-center w-10 border-r-[1px] ">
                  <span>{++count}</span>
                </Table.Cell>

                {/* Mã lớp */}
                <Table.Cell className="text-left border-r-[1px] !py-0 !my-0">
                  {dataItem.code}
                </Table.Cell>

                {/* Tên môn*/}
                <Table.Cell className="text-left border-r-[1px] !py-0 !my-0">
                  {dataItem.name}
                </Table.Cell>

                <Table.Cell
                  theme={{
                    base: `group-first/body:group-first/row:first:rounded-tl-lg
                      group-first/body:group-first/row:last:rounded-tr-lg
                      group-last/body:group-last/row:first:rounded-bl-lg
                      group-last/body:group-last/row:last:rounded-br-lg
                      px-4 py-4 text-center text-secondary-900`,
                  }}
                  className={`border-r-[1px] px-2 py-4 normal-case text-left max-w-[800px]`}
                >
                  <div className="flex-center gap-4">
                    {uploadedFileName[dataItem.id] ? (
                      uploadedFileName[dataItem.id].name === "Import lỗi" ? (
                        <p
                          className={`text-sm italic text-[#D4423E] font-semibold`}
                        >
                          {uploadedFileName[dataItem.id].name}
                        </p>
                      ) : (
                        uploadedFileName[dataItem.id].file && (
                          <a
                            href={URL.createObjectURL(
                              uploadedFileName[dataItem.id].file!
                            )} // Dùng dấu `!` vì đã kiểm tra null trước đó
                            download={uploadedFileName[dataItem.id].name}
                            className="text-blue-500 underline text-base italic"
                          >
                            <p className="text-sm italic">
                              {uploadedFileName[dataItem.id].name}
                            </p>
                          </a>
                        )
                      )
                    ) : null}

                    <input
                      ref={(el) => {
                        fileInputRefs.current[index] = el;
                      }}
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={(e) =>
                        dataItem.type === CourseType.InternCourse
                          ? handleStudentInternCourseFileUpload(
                              e,
                              dataItem.id,
                              dataItem.code
                            )
                          : handleStudentFileUpload(
                              e,
                              dataItem.id,
                              dataItem.code
                            )
                      }
                      style={{ display: "none" }}
                    />
                    <IconButton
                      text="Import file"
                      blue
                      onClick={() => handleButtonClick(index)}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <IconButton
        otherClasses="mt-4"
        text="Lưu"
        onClick={addStudentsToCourseAPI}
      />
    </div>
  );
}
