import {
    BookmarkProcess,
    BookmarkProcessRegistered,
    BookmarkProccessDeleted,
} from "../types/bookmark_process_type";
import { embed } from "../utils/embed";
import BookmarkDataType from "../types/bookmark_data_type";
import * as StorageLocalInterface from "../utils/storage_local_interface";

export default async function backgroundStorageOnChanged(
    changes: {
        [key: string]: chrome.storage.StorageChange;
    },
    namespace: "sync" | "local" | "managed"
) {
    if (namespace === "local") {
        onLocalChanged(changes);
    }
}

async function onLocalChanged(changes: {
    [key: string]: chrome.storage.StorageChange;
}) {
    if (changes["process_queue"] !== undefined) {
        await onLocalProcessQueueChanged();
    }
}

async function onLocalProcessQueueChanged() {
    const callback = async (process: BookmarkProcess | undefined) => {
        if (process === undefined) return;
        if (process.stage === "REGISTERED") {
            const process_registered = process as BookmarkProcessRegistered;
            await ProcessRegistered(process_registered);
        } else if (process.stage === "DELETED") {
            const process_deleted = process as BookmarkProccessDeleted;
            await ProcessDeleted(process_deleted);
        }
    };
    await StorageLocalInterface.popFromProcessQueue(callback);
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
    await StorageLocalInterface.addToSavedBookmarks(bookmark_data);
}

async function ProcessDeleted(process: BookmarkProccessDeleted) {
    console.log("ProcessDeleted start");
    await StorageLocalInterface.deleteFromSavedBookmarks(process.id);
}
