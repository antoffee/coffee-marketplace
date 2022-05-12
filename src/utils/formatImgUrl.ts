const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export const formatImgUrl = (url?: string) => {
    return !url || URL_REGEX.test(url) ? url : `${process.env.REACT_APP_BACKEND_URL ?? ''}${url}`;
};
