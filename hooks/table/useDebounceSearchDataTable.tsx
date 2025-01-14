// CourseDataItem
// RegisterGroupDataItem
// SubjectDataItem
// StudentDataItem
// TeacherDataItem
// OfficerDataItem
// TopicDataItem
// QAandProjectExamDataItem
// CentralizedExamDataItem
// ThesisTopicGradeDataItem
// InternReviewDataItem
// ThesisReviewTicketDataItem

import { useEffect } from "react";

const useDebounceSearchDataTable = <T extends object>(
  debouncedSearchTerm: string,
  setFilteredDataTable: (data: T[]) => void,
  applyFilter: () => void,
  cancelDetailFilter: () => void,
  handleChooseFilter: (filterType: any) => void,
  dataSource: T[],
  currentItems: T[]
) => {
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setFilteredDataTable(currentItems);
      applyFilter();
    } else {
      cancelDetailFilter();
      handleChooseFilter(null);

      const filteredData = dataSource.filter((dataItem) =>
        Object.values(dataItem).some((value) => {
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
        })
      );
      setFilteredDataTable(filteredData);
    }
  }, [debouncedSearchTerm, dataSource, currentItems, applyFilter, cancelDetailFilter, handleChooseFilter]);
};

export default useDebounceSearchDataTable;
