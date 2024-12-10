import { Table } from "flowbite-react";
import { useRef, useState } from "react";
import ErrorComponent from "../../Status/ErrorComponent";
import { tableTheme } from "../components/DataTable";
import * as XLSX from "xlsx";
import IconButton from "../../Button/IconButton";
import { StudentDataItem } from "@/types";
import BorderContainer from "../../BorderContainer";
import { mockDbCourses } from "@/mocks";

export default function ImportStudentsListInCourse() {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [dataTables, setDataTables] = useState<
    Record<string, StudentDataItem[]>
  >({});

  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<
    Record<string, string>
  >({});

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleButtonClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleStudentFileUpload = (e: any, courseId: string) => {
    console.log("courseId", courseId);

    const file = e.target.files[0];
    if (file) {
      setUploadedFileName((prevData: any) => ({
        ...prevData,
        [courseId]: file.name,
      }));
    }

    setIsLoading(true);
    setErrorMessages([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 1,
        defval: "",
      });

      let errorMessages: string[] = [];
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
                  [courseId]: "Import lỗi",
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
      }

      setIsLoading(false);
    };
  };

  return (
    <div>
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

      <BorderContainer otherClasses="p-6 flex flex-col gap-4">
        <p className="paragraph-semibold">
          Template import danh sách sinh viên
        </p>
        <a
          href="/assets/KTLN - template import ds sinh viên.xlsx"
          download
          className="text-blue-500 underline text-base italic"
        >
          Tải xuống template file import sinh viên cho lớp
        </a>
        <a
          href="/assets/KTLN - template import ds sinh viên lớp KLTN.xlsx"
          download
          className="text-blue-500 underline text-base italic"
        >
          Tải xuống template file import sinh viên và chia lớp với GVHD
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
        <Table hoverable theme={tableTheme}>
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
            {mockDbCourses.map((dataItem, index) => (
              <Table.Row
                key={dataItem.STT}
                onClick={() => {}}
                className={`bg-background-secondary text-left duration-100`}
              >
                {/* STT */}
                <Table.Cell className="text-center w-10 border-r-[1px] ">
                  <span>{dataItem.STT}</span>
                </Table.Cell>

                {/* Mã lớp */}
                <Table.Cell className="text-left border-r-[1px] !py-0 !my-0">
                  {dataItem["Mã lớp"]}
                </Table.Cell>

                {/* Tên môn*/}
                <Table.Cell className="text-left border-r-[1px] !py-0 !my-0">
                  {dataItem["Tên môn học"]}
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
                    <p
                      className={`text-sm italic ${
                        uploadedFileName[dataItem["Mã lớp"]] === "Import lỗi"
                          ? "text-red-400 font-semibold"
                          : ""
                      }`}
                    >
                      {uploadedFileName[dataItem["Mã lớp"]]}
                    </p>

                    <input
                      ref={(el) => {
                        fileInputRefs.current[index] = el;
                      }}
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={(e) =>
                        handleStudentFileUpload(e, dataItem["Mã lớp"])
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

      <IconButton otherClasses="mt-4" text="Lưu" onClick={() => {}} />
    </div>
  );
}
