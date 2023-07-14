import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useList } from "react-use";

import { embed } from "../utils/embed";
import { StorageLocalGet } from "../utils/storage_local";
import BookmarkDataType from "../types/bookmark_data_type";

const dot = (a: number[], b: number[]) => {
    return a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
};

const search = async (query: string) => {
    console.log("searching for", query);
    //embedding
    const vector = await embed(query);
    console.log("vector", vector);
    //保存しているブックマークの集合
    const storage_local = await StorageLocalGet(["saved_bookmarks"]);
    const saved_bookmarks = storage_local.saved_bookmarks
        ? (storage_local.saved_bookmarks as BookmarkDataType[])
        : new Array<BookmarkDataType>();
    const similarities: [BookmarkDataType, number][] = saved_bookmarks.map(
        (bookmark) => [bookmark, dot(vector, bookmark.vector)]
    );
    //similaritiesを類似度(第1要素)降順でソート
    similarities.sort((a, b) => b[1] - a[1]);
    return similarities.map((similarity) => similarity[0]);
};
const Popup = () => {
    const [searchResults, setSearchResults] = useList<BookmarkDataType>();
    const onSearchClick = (text: string) => {
        search(text).then((results) => {
            setSearchResults.set(results);
        });
    };
    const containerStyle = {
        width: "400px",
        height: "400px",
    };
    return (
        <>
            <div className="container" style={containerStyle}>
                <SearchTextbox onSearchClick={onSearchClick} />
                {searchResults.map((bookmark) => (
                    <p key={bookmark.id}>{bookmark.title}</p>
                ))}
            </div>
        </>
    );
};

interface SearchTextboxProps {
    onSearchClick: (text: string) => void;
}

const SearchTextbox = ({ onSearchClick }: SearchTextboxProps) => {
    const [text, setText] = useState("");
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => onSearchClick(text)}
            >
                検索
            </button>
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById("root")
);
