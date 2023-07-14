import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { StorageSyncGet, StorageSyncSet } from "../utils/storage_sync";

function Options() {
    return (
        <>
            <OpenAIApiKeyInput />
        </>
    );
}

function OpenAIApiKeyInput() {
    const [key, setKey] = useState("");

    useEffect(() => {
        StorageSyncGet(["openai_api_key"]).then((items) => {
            setKey(items["openai_api_key"]);
        });
    });

    const on_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKey(event.target.value);
        StorageSyncSet({
            openai_api_key: event.target.value,
        });
    };

    return (
        <>
            <div className="container">
                <label htmlFor="api_key_input">OpenAI Api Key</label>
                <input
                    id="api_key_input"
                    type="text"
                    value={key}
                    onChange={on_change}
                    className="form-control"
                />
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
