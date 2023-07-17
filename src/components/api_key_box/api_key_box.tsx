import React, { useEffect } from "react";

import * as StorageLocalInterface from "../../utils/storage_local_interface";

const ApiKeyBox = () => {
    const [apiKey, setApiKey] = React.useState<string | undefined>(undefined);
    useEffect(() => {
        StorageLocalInterface.getApiKey().then((value) => {
            setApiKey(value);
        });
    });
    const onclick = () => {
        if (apiKey) StorageLocalInterface.setApiKey(apiKey);
    };
    return (
        <>
            <p>APIキー</p>
            <div className="input-group mb-3">
                <input
                    type="password"
                    className="form-control"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <button
                    onClick={onclick}
                    className="btn btn-outline-primary"
                    type="button"
                >
                    更新
                </button>
            </div>
        </>
    );
};

export default ApiKeyBox;
