type MessageB2COnRegisteredType = {
    type: "REGISTERED";
};

type MessageB2COnBookmarkMovedInType = {
    type: "BOOKMARK_MOVED_IN";
};

type MessageB2CType =
    | MessageB2COnRegisteredType
    | MessageB2COnBookmarkMovedInType;

export type {
    MessageB2CType,
    MessageB2COnRegisteredType,
    MessageB2COnBookmarkMovedInType,
};
