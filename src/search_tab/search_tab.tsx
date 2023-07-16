import React from "react";
import ReactDOM from "react-dom";

import BookmarkSearchBox from "../components/bookmark_search_box/bookmark_search_box";

const SearchTab = () => {
    const containerStyle = {
        width: "400px",
        height: "400px",
    };
    return (
        <>
            <div className="container m-3" style={containerStyle}>
                <BookmarkSearchBox />
            </div>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <SearchTab />
    </React.StrictMode>,
    document.getElementById("root")
);
