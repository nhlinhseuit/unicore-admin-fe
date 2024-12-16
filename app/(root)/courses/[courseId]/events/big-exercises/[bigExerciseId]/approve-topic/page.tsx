"use client";

import RegisterTopicTable from "@/components/shared/Table/TableRegisterTopic/RegisterTopicTable";
import { RegisterTopicTableType } from "@/constants";
import {
  mockDataAllAppproveTopic,
  mockDataAssignedTopic,
  mockDataNotAssignedTopic,
  mockDataRefuseTopic,
} from "@/mocks";
import { useState } from "react";

const ApproveTopic = () => {
  const [selectedApproveTopicOption, setSelectedApproveTopicOption] =
    useState(3);

  const getDataTable = () => {
    switch (selectedApproveTopicOption) {
      case 1:
        return mockDataAllAppproveTopic;
      case 2:
        return mockDataAssignedTopic;
      case 3:
        return mockDataNotAssignedTopic;
      case 4:
        return mockDataRefuseTopic;
      default:
        return mockDataAllAppproveTopic;
    }
  };

  return (
    <RegisterTopicTable
    isOnlyView  
    type={RegisterTopicTableType.approveTopic}
      isEditTable={false}
      isMultipleDelete={false}
      dataTable={getDataTable()}
    />
  );
};

export default ApproveTopic;
