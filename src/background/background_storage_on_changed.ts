import {
    BookmarkProcess,
    BookmarkProcessRegistered,
    BookmarkProccessDeleted,
} from "../types/bookmark_process_type";
import { StorageLocalGet, StorageLocalSet } from "../utils/storage_local";
import { embed } from "../utils/embed";
import BookmarkDataType from "../types/bookmark_data_type";

export default async function backgroundStorageOnChanged(
    changes: {
        [key: string]: chrome.storage.StorageChange;
    },
    namespace: "sync" | "local" | "managed"
) {
    if (namespace === "local") {
        onLocalChanged();
    }
}

async function onLocalChanged() {
    const storage_local = await StorageLocalGet(["process_queue"]);
    if (storage_local.process_queue === undefined) return;
    const process_queue = storage_local.process_queue as BookmarkProcess[];
    //先頭のみ取り出し削除
    if (process_queue.length === 0) return;
    if (process_queue[0].stage === "REGISTERED") {
        const process = process_queue[0] as BookmarkProcessRegistered;
        await ProcessRegistered(process);
        console.log("finished ProcessRegistered");
    } else if (process_queue[0].stage === "DELETED") {
        const process = process_queue[0] as BookmarkProccessDeleted;
        await ProcessDeleted(process);
        console.log(process);
    }
    process_queue.shift();
    await StorageLocalSet({ process_queue });
}

async function ProcessRegistered(process: BookmarkProcessRegistered) {
    console.log("ProcessRegistered start");
    //bodyのembeddingを行う
    const emb = await embed(process.body);
    //localStorageへの保存内容
    const bookmark_data: BookmarkDataType = {
        id: process.id,
        url: process.url,
        title: process.title,
        vector: emb,
    };
    //bodyのembeddingをlocalstorageに保存する
    const storage_local = await StorageLocalGet(["saved_bookmarks"]);
    const saved_bookmarks = storage_local.saved_bookmarks
        ? (storage_local.saved_bookmarks as BookmarkDataType[])
        : new Array<BookmarkDataType>();
    saved_bookmarks.push(bookmark_data);
    await StorageLocalSet({ saved_bookmarks });
}

async function ProcessDeleted(process: BookmarkProccessDeleted) {
    console.log("ProcessDeleted start");
    const storage_local = await StorageLocalGet(["saved_bookmarks"]);
    const saved_bookmarks = storage_local.saved_bookmarks
        ? (storage_local.saved_bookmarks as BookmarkDataType[])
        : new Array<BookmarkDataType>();
    const bookmark_to_delete = saved_bookmarks.find(
        (bookmark) => bookmark.id === process.id
    );
    if (bookmark_to_delete === undefined) return;
    const index = saved_bookmarks.indexOf(bookmark_to_delete);
    saved_bookmarks.splice(index, 1);
    await StorageLocalSet({ saved_bookmarks });
}
