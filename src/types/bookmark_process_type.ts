type BookmarkProcessRegistered = {
    stage: 'REGISTERED',
    id: string,
    body: string,
    title: string,
    url: string,
};

type BookmarkProcess = BookmarkProcessRegistered;

export type { BookmarkProcess, BookmarkProcessRegistered };