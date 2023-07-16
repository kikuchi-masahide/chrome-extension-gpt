import { BookmarkProcess } from "./bookmark_process_type";
import BookmarkDataType from "./bookmark_data_type";

type StorageLocalData = {
    openai_api_key: string;
    process_queue: BookmarkProcess[];
    saved_bookmarks: BookmarkDataType[];
};

export default StorageLocalData;
