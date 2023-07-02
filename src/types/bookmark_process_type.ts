type BookmarkProcessRegistered = {
    stage: 'REGISTERED',
    id: string,
    body: string,
    title: string,
    url: string,
};

type BookmarkProccessDeleted = {
    stage: 'DELETED',
    id: string,
};

type BookmarkProcess = BookmarkProcessRegistered | BookmarkProccessDeleted;

export type { BookmarkProcess, BookmarkProcessRegistered, BookmarkProccessDeleted };