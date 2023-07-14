import { StorageLocalGet, StorageLocalSet } from "../utils/storage_local";
import {
    BookmarkProcess,
    BookmarkProccessDeleted,
} from "../types/bookmark_process_type";

//ブックマークが削除されたら、実行される関数
export default async function backgroundBookmarksOnDeleted(
    id: string,
    removeInfo: chrome.bookmarks.BookmarkRemoveInfo
) {
    const storage_local = await StorageLocalGet(["process_queue"]);
    const process_queue: BookmarkProcess[] =
        storage_local["process_queue"] ?? [];
    const new_process: BookmarkProccessDeleted = {
        stage: "DELETED",
        id: removeInfo.node.id,
    };
    process_queue.push(new_process);
    await StorageLocalSet({
        process_queue,
    });
}
