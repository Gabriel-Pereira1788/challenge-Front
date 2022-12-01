import React from "react";

type Props = {
  color: string;
  cordinates: {
    x: number;
    y: number;
  };
};

export default function Circle({ color, cordinates }: Props) {
  return (
    <div
      className={"rounded-full w-24 h-24  absolute " + color}
      style={{
        right: cordinates.x,
        left: cordinates.x,
        top: cordinates.y,
        transform: "translate(-50%,-50%)",
      }}
    ></div>
  );
}

