<script lang="ts">
import { comPlayer, showGameScreen, username } from "../data/GameData";


    let inputtedUsername = ""
    let selectedComPlayerAmount = ""

    let is1ComSelected = false
    let is2ComSelected = false
    let is3ComSelected = false

    let playButtonDisabled = true

    const selectComPlayerAmount = (comPlayer: "1-com-player" | "2-com-player" | "3-com-player") => {
        selectedComPlayerAmount = comPlayer

        switch(comPlayer) {
            case "1-com-player":
                is1ComSelected = true
                is2ComSelected = false
                is3ComSelected = false
                break
            case "2-com-player":
                is1ComSelected = false
                is2ComSelected = true
                is3ComSelected = false
                break
            case "3-com-player":
                is1ComSelected = false
                is2ComSelected = false
                is3ComSelected = true
                break
        }
    }

    const checkToDisablePlayButton = (value: string) => {
        if(inputtedUsername === "" || selectedComPlayerAmount === "") {
            playButtonDisabled = true
        }
        else {
            playButtonDisabled = false
        }
    }

    const handlePlay = () => {
        localStorage.setItem("username", inputtedUsername)
        localStorage.setItem("comPlayerAmount", selectedComPlayerAmount)

        username.set(inputtedUsername)
        comPlayer.set(selectedComPlayerAmount)

        sessionStorage.setItem("showGameWindow", JSON.stringify(true))
        showGameScreen.set(true)
    }

    $: checkToDisablePlayButton(selectedComPlayerAmount)
    $: checkToDisablePlayButton(inputtedUsername)
</script>

<svelte:head>
    <title>Exploding Kittens In Electron - Title Screen</title>
</svelte:head>

<div class="title-screen">
    <header>
        <h1>Welcome To Exploding Kittens</h1>
        <img src="images/icons/logo.svg" alt="">
    </header>
    <div>
        <div class="username-input-container">
            <label for="username-input">Enter A Username:</label>
            <br> 
            <input type="text" id="username-input" bind:value="{inputtedUsername}">
        </div>
        <hr>
        <div>
            <p>Select How Many Computer Players You Want:</p>
            <button class="com-player-selection {is1ComSelected ? "selected" : ""}" on:click="{() => selectComPlayerAmount("1-com-player")}">1 Computer Player</button>
            <button class="com-player-selection {is2ComSelected ? "selected" : ""}" on:click="{() => selectComPlayerAmount("2-com-player")}">2 Computer Players</button>
            <button class="com-player-selection {is3ComSelected ? "selected" : ""}" on:click="{() => selectComPlayerAmount("3-com-player")}">3 Computer Players</button>
        </div>
        <button on:click="{handlePlay}" disabled="{playButtonDisabled}">Play!</button>
    </div>
</div>

<style>
    .title-screen {
        text-align: center;
    }
    header {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
    }
    header h1 {
        max-width: 300px;
        align-items: center;
    }
    header img {
        margin-right: 20px;
        width: 160px;
        height: 160px;
    }
    .com-player-selection {
        border-radius: 100px;
        background-color: #168086;
        color: white;
        transition: scale 200ms;
        transition-timing-function: ease-in;
    }
    .com-player-selection.selected {
        background-color: #0aa1c3;
        scale: 1.1;
    }

    button:not(:disabled) {
        cursor: pointer;
    }
    button {
        margin: 20px;
    }
</style>    