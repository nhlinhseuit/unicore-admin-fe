import React from "react";

interface Props {
  text: string;
}

const MyErrorText = (params: Props) => {
  return (
    <p className="text-[0.8rem] font-medium dark:text-red-900 text-red-500">
      {params.text}
    </p>
  );
};

export default MyErrorText;
