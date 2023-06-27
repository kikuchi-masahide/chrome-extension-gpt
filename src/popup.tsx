import React, { useEffect,useState } from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  const [count, setCount] = useState(0);
  const [choice,setChoice] = useState("red");

  useEffect(() => {
    chrome.storage.sync.get({
      "count": 0,
      "choice": "red",
    },(items) => {
      setCount(items['count']);
      setChoice(items['choice']);
    });
  },[]);

  const onclick = () => {
    chrome.storage.sync.set({
      'count': count+1
    });
    setCount(count+1);
  };

  return (
    <>
      <button
        onClick={onclick}
        style={{ marginRight: "5px" }}
      >
        count up
      </button>
      <p>count:{count}</p>
      <p>choice:{choice}</p>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
