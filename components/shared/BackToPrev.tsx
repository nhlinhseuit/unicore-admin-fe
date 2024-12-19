"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  text: string;
  linkPrev?: string;
  bold?: boolean;
  onClickPrev?: () => void;
  otherClasses?: string;
}

const BackToPrev = (params: Props) => {
  const router = useRouter();

  return (
    <div
      className={`inline-flex justify-start mt-4 mb-6 text-sm cursor-pointer ${params.otherClasses}`}
      onClick={() => {
        if (params.linkPrev) {
          console.log("linkPrev", params.linkPrev);
          router.push(params.linkPrev);
          return;
        }
        if (params.onClickPrev) {
          params.onClickPrev();
          return;
        }
      }}
    >
      <Image
        src="/assets/icons/chevron-left-table.svg"
        alt="previous"
        width={21}
        height={21}
        className="cursor-pointer mr-2"
      />
      <p className={`${params.bold ? "paragraph-semibold" : ""}`}>
        {params.text}
      </p>
    </div>
  );
};

export default BackToPrev;
