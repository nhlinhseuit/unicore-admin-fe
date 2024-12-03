"use client";

import IconButton from "@/components/shared/Button/IconButton";
import { mockCategoryList, mockNotiTypeList } from "@/mocks";
import { useState } from "react";

const Setting = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    mockCategoryList.map((item) => item.id)
  );
  const [selectedNotiTypes, setSelectedNotiTypes] = useState<number[]>(
    mockNotiTypeList.map((item) => item.id)
  );

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNotiTypeChange = (id: number) => {
    setSelectedNotiTypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    console.log("Selected Categories:", selectedCategories);
    console.log("Selected Notification Types:", selectedNotiTypes);
  };

  return <div>Setting</div>;
};

export default Setting;
