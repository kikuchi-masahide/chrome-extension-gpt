import React from "react";
import BookmarkDataType from "../../types/bookmark_data_type";

type SearchResultsTableRowProps = {
    bookmark: BookmarkDataType;
    similarity: number;
};

const SearchResultsTableRow = (props: SearchResultsTableRowProps) => {
    const on_a_click = () => {
        chrome.tabs.create({ url: props.bookmark.url });
    };
    const title_style = {
        cursor: "pointer",
        color: "blue",
    };
    return (
        <tr>
            <th>{String(props.similarity).substring(0, 5)}</th>
            <th>
                <span onClick={on_a_click} style={title_style}>
                    <u>{props.bookmark.title}</u>
                </span>
            </th>
        </tr>
    );
};

export default SearchResultsTableRow;
