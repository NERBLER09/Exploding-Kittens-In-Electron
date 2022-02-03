import { writable } from "svelte/store";

const showMessageBox = writable(false)
const showSeeTheFutureMessageBox = writable(false)

const headerText = writable("Message Box Header")
const bodyText = writable("Message Body Text")

const closeButtonText = writable("Play on")
const closeButtonCustomFunction = writable(() => {})

const setDefaultMessageBoxProps = (header: string, body: string, buttonText: string = "Play On", closeButtonFunction: () => void = () => {}) => {
    headerText.set(header)
    bodyText.set(body)
    closeButtonText.set(buttonText)
    closeButtonCustomFunction.set(closeButtonFunction)

    showMessageBox.set(true)
}

showMessageBox.subscribe(value => {
    if(!value) {
        // TODO: Add any more custom message boxes
        showSeeTheFutureMessageBox.set(false)
    }
})

export {
    showMessageBox,
    headerText,
    bodyText,
    closeButtonText,
    closeButtonCustomFunction,
    setDefaultMessageBoxProps,
    showSeeTheFutureMessageBox
}