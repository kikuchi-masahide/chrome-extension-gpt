import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Configuration, OpenAIApi } from "openai";

const Popup = () => {
  const [openai_api_key, setOpenAIApiKey] = useState("");
  let openai: null | OpenAIApi = null;

  useEffect(() => {
    SetOpenAIApiKey(setOpenAIApiKey);
  });

  //openai_api_keyが設定されたタイミングでopenaiを初期化する
  useEffect(() => {
    if (openai_api_key === "") return;
    const configuration = new Configuration({
      "apiKey": openai_api_key,
    });
    openai = new OpenAIApi(configuration);
  }, [openai_api_key]);

  return (
    <>
    </>
  );
};

function SetOpenAIApiKey(api_key_setter: (api_key: string) => void) {
  //get storaged value with key "openai_api_key" using chrome.sync.get
  chrome.storage.sync.get({
    "openai_api_key": "",
  }, (items) => {
    api_key_setter(items['openai_api_key']);
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
