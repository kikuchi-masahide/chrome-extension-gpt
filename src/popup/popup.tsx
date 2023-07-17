import React from "react";
import ReactDOM from "react-dom";

import OpenInTabButton from "../components/open_in_tab_button/open_in_tab_button";
import BookmarkSearchBox from "../components/bookmark_search_box/bookmark_search_box";

const Popup = () => {
    const containerStyle = {
        width: "400px",
        height: "400px",
    };
    return (
        <>
            <div className="container m-3" style={containerStyle}>
                <div className="container">
                    <OpenInTabButton />
                </div>
                <BookmarkSearchBox />
            </div>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById("root")
);
