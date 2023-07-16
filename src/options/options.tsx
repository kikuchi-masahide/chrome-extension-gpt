import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as StorageLocalInterface from "../utils/storage_local_interface";

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
        StorageLocalInterface.getApiKey().then((key) => {
            if (key) {
                setKey(key);
            }
        });
    });

    const on_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKey(event.target.value);
        StorageLocalInterface.setApiKey(event.target.value);
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
