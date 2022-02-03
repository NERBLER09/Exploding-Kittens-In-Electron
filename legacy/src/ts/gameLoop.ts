/**
 * Check if the message box is hidden
 * @param callback Runs when the message box is hidden
 */
const checkIfMessagesBoxIsShowing = (callback: () => void): void => {
    const waitUntilMessageBoxIsClosed = setInterval(() => {
        if ($("#message_box").is(":hidden")) {
            clearInterval(waitUntilMessageBoxIsClosed)
            callback()
        }
    }, 100);
}

setInterval(() => {

}, 500)

export {
    checkIfMessagesBoxIsShowing
}