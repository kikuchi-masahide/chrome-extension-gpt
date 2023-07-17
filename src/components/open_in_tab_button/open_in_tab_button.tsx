import React from "react";

const OpenInTabButton = () => {
    const onclick = () => {
        chrome.tabs.create({ url: "full_window.html" });
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
