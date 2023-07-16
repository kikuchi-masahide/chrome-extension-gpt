import React from "react";

const OpenInTabButton = () => {
    const onclick = () => {
        chrome.tabs.create({ url: "popup.html" });
    };
    return (
        <>
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={onclick}
            >
                タブで開く
            </button>
        </>
    );
};

export default OpenInTabButton;
