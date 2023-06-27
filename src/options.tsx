import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Options(){
  return (
    <>
      <OpenAIApiKeyInput />
    </>
  );
};

function OpenAIApiKeyInput(){
  const [key,setKey] = useState("");

  useEffect(() => {
    chrome.storage.sync.get({
      "openai_api_key": "",
    },(items) => {
      setKey(items['openai_api_key']);
    });
  });

  const on_change = (event:React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
    chrome.storage.sync.set({
      'openai_api_key': event.target.value
    })
  };

  return (
    <>
    <div className="container">
      <label htmlFor="api_key_input">OpenAI Api Key</label>
      <input id="api_key_input" type="text" value={key} onChange={on_change} className="form-control"/>
    </div>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);

