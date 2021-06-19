const closeMessageBox = ()  => {
    $("#message_box").html("")
    $("#message_box").hide()
}

const displayMessageBox = (header: string, mainText: string) => {
    const messageBoxElement = $(`<h2>${header}</h2> <p>${mainText}</p> <button>Close</button>`)

    $("#message_box").append(messageBoxElement)
    $("#message_box").last().click(closeMessageBox)
    $("#message_box").show()
}

export {
    displayMessageBox
}