import { Dropdown } from "flowbite-react";
import React from "react";
import IconButton from "./Button/IconButton";
import Image from "next/image";
import { LargeNumberLike } from "crypto";
import TableSearch from "./Search/TableSearch";

interface Props {
  selectedItem: string | number;
  text: string;
  dataOptions: any;
  onClick: (value: number) => void;
}

const MyDropdown = (params: Props) => {
  return (
    <Dropdown
      className="z-30 rounded-lg"
      label=""
      dismissOnClick={true}
      renderTrigger={() => (
        <div>
          <IconButton
            text={params.text}
            onClick={() => {}}
            iconRight={"/assets/icons/chevron-down.svg"}
            bgColor="bg-white"
            textColor="text-black"
            border
          />
        </div>
      )}
    >
      <TableSearch
        setSearchTerm={() => {}}
        searchTerm={""}
        otherClasses="p-2"
      />
      <div className="scroll-container scroll-container-dropdown-content">
        {params.dataOptions.map((option: any, index: number) => (
          <Dropdown.Item
            key={`${option}_${index}`}
            onClick={() => {
              params.onClick(option.id);
            }}
          >
            <div className="flex justify-between w-full gap-4">
              <p className="text-left line-clamp-1">{option.value}</p>
              {params.selectedItem === option.value ? (
                <Image
                  src="/assets/icons/check.svg"
                  alt="search"
                  width={21}
                  height={21}
                  className="cursor-pointer mr-2"
                />
              ) : (
                <></>
              )}
            </div>
          </Dropdown.Item>
        ))}
      </div>
    </Dropdown>
  );
};

export default MyDropdown;
