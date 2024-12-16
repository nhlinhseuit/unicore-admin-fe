"use client";

import TopicGroupTable from "@/components/shared/Table/TableTopic/TopicDataTable";
import { mockTopicDataTable } from "@/mocks";

const UploadTopicResult = () => {
  return (
    <TopicGroupTable
      isOnlyView
      isEditTable={false}
      isMultipleDelete={false}
      // @ts-ignore
      dataTable={mockTopicDataTable}
    />
  );
};

export default UploadTopicResult;
