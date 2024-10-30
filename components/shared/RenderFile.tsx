import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Props {
  _id: string;
  name: String;
}

const RenderFile = ({ _id, name }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge
        className="
      border-gray-200
      shadow-sm
      text-[11px] font-light leading-[12px] 
      italic 
      text-[#636363]
      rounded-2xl px-2 py-2 "
      >
        <Image
          src={"/assets/icons/attach_file.svg"}
          width={18}
          height={18}
          alt={"file"}
          className={`object-contain cursor-pointer pr-1`}
        />
        {name}
      </Badge>
    </Link>
  );
};

export default RenderFile;