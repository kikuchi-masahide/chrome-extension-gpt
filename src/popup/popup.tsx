import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useList } from "react-use";

import { embed } from "../utils/embed";
import BookmarkDataType from "../types/bookmark_data_type";
import * as StorageLocalInterface from "../utils/storage_local_interface";
import SearchResultsTable from "./search_results_table";

const dot = (a: number[], b: number[]) => {
    return a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
};

//[BookmarkDatatType,類似度]の配列を、類似度降順でソートしたものを返す
const search = async (query: string) => {
    console.log("searching for", query);
    //embedding
    const vector = await embed(query);
    console.log("vector", vector);
    //保存しているブックマークの集合
    const saved_bookmarks = await StorageLocalInterface.getAllSavedBookmarks();
    const similarities: [BookmarkDataType, number][] = saved_bookmarks.map(
        (bookmark) => [bookmark, dot(vector, bookmark.vector)]
    );
    //similaritiesを類似度(第1要素)降順でソート
    similarities.sort((a, b) => b[1] - a[1]);
    return similarities;
};
const Popup = () => {
    const [searchResults, setSearchResults] = useList<BookmarkDataType>();
    const [similarities, setSimilarities] = useList<number>();
    const onSearchClick = (text: string) => {
        search(text).then((results) => {
            setSearchResults.set(results.map((result) => result[0]));
            setSimilarities.set(results.map((result) => result[1]));
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
                <SearchResultsTable
                    searchResults={searchResults}
                    similarities={similarities}
                />
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
