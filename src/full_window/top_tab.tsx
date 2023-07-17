import React from "react";
import TopTabModeType from "../types/top_tab_mode_type";

type TopTabProps = {
    tab_mode: TopTabModeType;
    setTabMode: (tab_mode: TopTabModeType) => void;
};

const TopTab = (props: TopTabProps) => {
    const search_class_name =
        "nav-link" + (props.tab_mode === "search" ? " active" : "");
    const option_class_name =
        "nav-link" + (props.tab_mode === "option" ? " active" : "");
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a
                    className={search_class_name}
                    onClick={() => props.setTabMode("search")}
                >
                    検索
                </a>
            </li>
            <li className="nav-item">
                <a
                    className={option_class_name}
                    onClick={() => props.setTabMode("option")}
                >
                    オプション
                </a>
            </li>
        </ul>
    );
};

export default TopTab;
