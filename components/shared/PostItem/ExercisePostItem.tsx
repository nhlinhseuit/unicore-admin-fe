import { getAvatarName } from "@/lib/utils";
import Image from "next/image";
import MyAvatar from "../../courses/MyAvatar";
import MyComment from "../../courses/MyComment";
import OtherComment from "../../courses/OtherComment";
import RenderFile from "../Annoucements/RenderFile";
import StatusButton from "../Button/StatusButton";
import Divider from "../Divider";


import parse from "html-react-parser";
import Prism from "prismjs";

import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-mongodb";
import "prismjs/components/prism-r";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-typescript";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import { useEffect } from "react";

interface Comment {
  id: string;
  author: string;
  content: string;
}

interface Props {
  id: string;
  creator: string;
  createdAt: string;
  title: string;
  desc: string;
  fileName: string;
  comments?: Comment[];
  setGrading: () => void;
}

const ExercisePostItem = (params: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  
  return (
    <div className="card-wrapper rounded-[10px]">
      <div className="relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <MyAvatar text={params.creator} />
          <p className="body-regular">{params.creator}</p>
          <p className="small-regular italic text-[#636363] line-clamp-1 ">
            - {params.createdAt}
          </p>
          <StatusButton
            green
            text="Bài tập"
            smallText
            otherClasses="rounded-md ml-4"
            infoComponent={
              <ul className="text-white text-[12px] text-left">
                <li role="menuitem">
                  <span>
                    Thời hạn nộp bài: 12h SA 8/11/2024 - 11h30 SA 15/11/2024
                  </span>
                </li>
                <li role="menuitem">
                  <span>
                    Thời hạn nộp trễ: 12h SA 8/11/2024 - 11h30 SA 15/11/2024
                  </span>
                </li>
                <li role="menuitem">
                  <span>Thời hạn đóng bài nộp: 12h SA 16/11/2024</span>
                </li>
              </ul>
            }
          />
          <Image
            src={"/assets/icons/edit-black.svg"}
            width={26}
            height={26}
            alt={"edit"}
            className={`object-contain cursor-pointer ml-4`}
          />
        </div>

        <p className="base-regular mt-3 ml-2 ">{params.title}</p>
        <p className="body-regular mt-2 ml-2 ">{parse(params.desc)}</p>

        <RenderFile _id={1} name={"exercise.docx"} otherClasses={"mt-3 px-2"} />

        <Divider />

        <div className="flex flex-col gap-4">
          {params.comments && params.comments.map((item, index) => (
             <>
             <OtherComment
               key={item.id}
               textAvatar={getAvatarName(item.author)}
               name={item.author}
               comment={item.content}
             />
             <Divider />
           </>
          ))}
        </div>


        <MyComment
          textAvatar="HL"
          type="post"
          sourceId={params.id}
          onComplete={(cmt: string) => {
          }}
        />
      </div>
    </div>
  );
};

export default ExercisePostItem;
