import React from "react";
import BookmarkDataType from "../../types/bookmark_data_type";
import SearchResultsTableRow from "./search_results_table_row";

type SearchResultsTableProps = {
    searchResults: BookmarkDataType[];
    similarities: number[];
};

const SearchResultsTable = (props: SearchResultsTableProps) => {
    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">類似度</th>
                        <th scope="col">タイトル</th>
                    </tr>
                </thead>
                <tbody>
                    {props.searchResults.map((bookmark, i) => (
                        <SearchResultsTableRow
                            key={bookmark.id}
                            bookmark={bookmark}
                            similarity={props.similarities[i]}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchResultsTable;
