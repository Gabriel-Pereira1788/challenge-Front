import React, { MouseEvent, useState } from "react";
import Button from "./components/Button";
import Circle from "./components/Circle";

type DataCircle = {
  cordinates: {
    x: number;
    y: number;
  };
  color: string;
};

const colors = [
  "bg-black",
  "bg-white",
  "bg-orange-200",
  "bg-lime-300",
  "bg-red-400",
  "bg-purple-400",
  "bg-cyan-200",
  "bg-green-400",
];

function getRandomColors() {
  return Math.floor(Math.random() * colors.length);
}

function filterData<T extends Object>(data: T[]) {
  const lastItem = data[data.length - 1];
  const newData = data.filter((item) => item !== lastItem);

  return {
    lastItem,
    newData,
  };
}

function App() {
  const [dataCircles, setDataCircles] = useState<DataCircle[]>([]);
  const [respawnCircles, setRespawnCircles] = useState<DataCircle[]>([]);

  const handleAddCircle = (event: MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;

    const element = event.target as HTMLElement;

    if (element.innerText === "Desfazer" || element.innerText === "Refazer") {
      return;
    }
    const newCordinates = {
      x: clientX,
      y: clientY,
    };

    setDataCircles((data) => [
      ...data,
      { cordinates: newCordinates, color: colors[getRandomColors()] },
    ]);
  };

  const handleUndo = () => {
    const { lastItem, newData } = filterData(dataCircles);

    setDataCircles(newData);
    if (lastItem) {
      setRespawnCircles((prevData) => [...prevData, lastItem]);
    }
  };

  const handleRedo = () => {
    if (respawnCircles.length > 0) {
      const { lastItem, newData } = filterData(respawnCircles);

      setRespawnCircles(newData);
      setDataCircles((prevData) => [...prevData, lastItem]);
    }
  };
  return (
    <main
      className="bg-slate-700 w-screen h-screen flex justify-center items-center relative z-0"
      onClick={handleAddCircle}
    >
      {dataCircles.length > 0 &&
        dataCircles.map(({ cordinates, color }) => (
          <Circle color={color} cordinates={cordinates} />
        ))}

      <div className="w-2/3 flex gap-5 justify-center items-center">
        <Button title="desfazer" onClick={handleUndo} />
        <Button title="refazer" onClick={handleRedo} />
      </div>
    </main>
  );
}

export default App;

