import backgroundBookmarksOnCreated from "./background_bookmarks_oncreated";
import backgroundStorageOnChanged from "./background_storage_on_changed";
import backgroundBookmarksOnDeleted from "./background_bookmarks_ondeleted";

//localstorageのprocess queueを監視し、変更があったら先頭のタスクのみ処理
chrome.storage.onChanged.addListener(backgroundStorageOnChanged);

//ブックマークが登録されたら、contentに通知する
chrome.bookmarks.onCreated.addListener(backgroundBookmarksOnCreated);

//ブックマークが削除されたら、contentに通知する
chrome.bookmarks.onRemoved.addListener(backgroundBookmarksOnDeleted);