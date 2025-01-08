"use client";

import RegisterTopicTable from "@/components/shared/Table/TableRegisterTopic/RegisterTopicTable";
import { RegisterTopicTableType } from "@/constants";
import { mockDataStudentRegisterTopic } from "@/mocks";

//! LỚP GIẢNG VIÊN QUẢN LÝ, KHOA CHỈ ĐƯỢC XEM, KHÔNG THAO TÁC

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
