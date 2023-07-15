import { BookmarkProccessDeleted } from "../types/bookmark_process_type";
import * as StorageLocalInterface from "../utils/storage_local_interface";

//ブックマークが削除されたら、実行される関数
export default async function backgroundBookmarksOnDeleted(
    id: string,
    removeInfo: chrome.bookmarks.BookmarkRemoveInfo
) {
    console.log(id);
    const new_process: BookmarkProccessDeleted = {
        stage: "DELETED",
        id: removeInfo.node.id,
    };
    await StorageLocalInterface.pushToProcessQueue(new_process);
}
