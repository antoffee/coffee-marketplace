/**
 * Disables scroll in the document
 * @param {boolean} isHidden - flag for disable scroll in the document
 */

export const disableWindowScroll = (isHidden: boolean) => {
    document.body.style.overflow = isHidden ? 'hidden' : 'revert';
};
