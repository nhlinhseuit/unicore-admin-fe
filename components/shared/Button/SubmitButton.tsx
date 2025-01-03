import React from "react";
import { Button } from "../../ui/button";
import Image from "next/image";

interface SubmitButtonProps {
  text: string;
  onClick?: () => void;
  isSubmit?: boolean;
  iconLeft?: string;
  iconRight?: string;
  iconWidth?: number;
  iconHeight?: number;
  bgColor?: string;
  textColor?: string;
  border?: boolean;
  otherClasses?: string;
  isFilter?: boolean;
}

const SubmitButton = (params: SubmitButtonProps) => {
  return (
    <Button
      onClick={params.onClick ? params.onClick : undefined}
      type="submit"
      className={`
        flex
        gap-1
        items-center
        justify-center
        ${params.border && "border border-gray-200"}
        ${params.isFilter && "border-[#2563EB]"}
        ${params.textColor ? `${params.textColor}` : "text-white"} 
        ${params.bgColor ? `${params.bgColor}` : "bg-primary-500"} 
        hover:bg-primary-800
        focus:ring-1
        focus:ring-gray-200
        font-medium
        rounded-lg
        text-sm
        px-4
        py-2
        dark:bg-primary-600
        dark:hover:bg-primary-700
        focus:outline-none
        dark:focus:ring-primary-800
        h-auto
        text-center
        
        ${params.otherClasses}
        `}
    >
      {/* LEFT ICON */}
      {params.iconLeft && (
        <Image
          src={params.iconLeft}
          width={params.iconWidth ? params.iconWidth : 20}
          height={params.iconHeight ? params.iconHeight : 20}
          alt="DevFlow"
          color="text-white"
        />
      )}

      <span className="flex-grow pl-2 pr-2 text-center">{params.text}</span>

      {/* RIGHT ICON */}
      {params.iconRight && (
        <Image src={params.iconRight} width={18} height={18} alt="DevFlow" />
      )}
    </Button>
  );
};

export default SubmitButton;
