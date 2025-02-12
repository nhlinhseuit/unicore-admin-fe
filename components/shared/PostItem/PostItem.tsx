import { getAvatarName } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MyAvatar from "../../courses/MyAvatar";
import MyComment from "../../courses/MyComment";
import OtherComment from "../../courses/OtherComment";
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
import SmallAvatar from "@/components/courses/SmallAvatar";
import { fetchComments } from "@/services/commentsServices";
import { ICommentResponseData } from "@/types/entity/Comment";

interface Props {
  id: string;
  creator: string;
  createdAt: string;
  title: string;
  desc: string;
  fileName: string;
  comments?: Comment[];
}

const PostItem = (params: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const [cmt, setCmt] = useState("");
  const [isViewComments, setIsViewComments] = useState(false);
  const [comments, setComments] = useState<ICommentResponseData[]>([]);

  console.log("comments", comments);

  const fetchViewComments = () => {
    fetchComments(params.id).then((data) => {
      console.log("data fetchComments", data);
      setComments(data.data.data);
    });
  };

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
            temp
            text="Thông báo"
            smallText
            otherClasses="rounded-md ml-4"
          />
          <Image
            src={"/assets/icons/edit-black.svg"}
            width={26}
            height={26}
            alt={"edit"}
            className={`object-contain cursor-pointer ml-4`}
            onClick={() => {
              router.push(`${pathName}/edit-announcement?id=${params.id}`);
            }}
          />
        </div>

        <p className="base-regular mt-3 ml-2 ">{params.title}</p>
        <p className="body-regular mt-2 ml-2 ">{parse(params.desc)}</p>

        {/* //! KHI NÀO CÓ NỘP FILE  */}
        {/* <RenderFile _id={1} name={"exercise.docx"} otherClasses={"mt-3 px-2"} /> */}

        <Divider />

        {isViewComments && comments.length > 0 ? (
          <div className="flex flex-col">
            {comments.map((item, index) => (
              <div key={item.id}>
                <OtherComment
                  textAvatar={getAvatarName(item.creator_name)}
                  name={item.creator_name}
                  comment={item.content}
                />
                <Divider />
              </div>
            ))}
          </div>
        ) : (
          <p
            onClick={() => {
              setIsViewComments(true);

              //! fake API
              fetchViewComments();
            }}
            className="flex justify-end underline cursor-pointer body-regular text-gray-500 mt-3 ml-2"
          >
            Xem bình luận
            {/* {params.commentsCount} bình luận */}
          </p>
        )}

        {cmt !== "" ? (
          <div className="flex pl-2 gap-4 mb-4">
            <SmallAvatar text={"HL"} bgColor={"bg-[#DA3B01]"} />

            <div>
              <p className="small-regular">Nguyễn Hoàng Linh</p>
              <p className="body-regular mt-1">{cmt}</p>
            </div>
          </div>
        ) : null}

        <MyComment
          textAvatar="HL"
          type="post"
          sourceId={params.id}
          onComplete={(cmt: string) => {
            setCmt(cmt);
          }}
        />
      </div>
    </div>
  );
};

export default PostItem;
