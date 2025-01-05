"use client";

import RegisterTopicTable from "@/components/shared/Table/TableRegisterTopic/RegisterTopicTable";
import { RegisterTopicTableType } from "@/constants";
import { mockDataStudentRegisterTopic } from "@/mocks";

const RegisterTopic = () => {
  return (
    <RegisterTopicTable
      isOnlyView
      type={RegisterTopicTableType.registerTopic}
      isEditTable={false}
      isMultipleDelete={false}
      dataTable={mockDataStudentRegisterTopic}
    />
  );
};

export default RegisterTopic;
