import React, { useState } from "react";
import ReactDOM from "react-dom";

import TopTab from "./top_tab";
import TopTabModeType from "../types/top_tab_mode_type";
import SearchBody from "./search_body";
import OptionBody from "./option_body";

const SearchTab = () => {
    const [top_tab_mode, set_top_tab_mode] = useState<TopTabModeType>("search");
    return (
        <>
            <TopTab tab_mode={top_tab_mode} setTabMode={set_top_tab_mode} />
            {top_tab_mode === "search" ? <SearchBody key="search" /> : <></>}
            {top_tab_mode === "option" ? <OptionBody key="option" /> : <></>}
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <SearchTab />
    </React.StrictMode>,
    document.getElementById("root")
);
