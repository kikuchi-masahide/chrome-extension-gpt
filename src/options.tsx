import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Options = () => {
  const [choice,setChoice] = useState("red");

  useEffect(() => {
    chrome.storage.sync.get({
      "choice": "red",
    },(items) => {
      setChoice(items['choice']);
    });
  });

  const generate_onclick = (color:string) => {
    return () => {
      setChoice(color);
      chrome.storage.sync.set({
        'choice': color
      })
    };
  };

  return (
    <>
      <ul>
        <li><button onClick={generate_onclick('red')}>red</button></li>
        <li><button onClick={generate_onclick('blue')}>blue</button></li>
        <li><button onClick={generate_onclick('green')}>green</button></li>
      </ul>
      <p>choice:{choice}</p>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
