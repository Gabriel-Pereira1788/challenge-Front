import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  title: string;
}

export default function Button({ title, ...rest }: Props) {
  return (
    <button
      {...rest}
      className="p-3 w-1/4 rounded-md bg-green-400 shadow-md drop-shadow-md text-white text-center transition-all hover:bg-green-300 relative z-10 capitalize"
    >
      {title}
    </button>
  );
}

