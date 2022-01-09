<script lang="ts">
import { onMount } from "svelte";
import GameStatus from "../components/GameStatus.svelte";
import MessageBox from "../components/MessageBoxes/MessageBox.svelte";

import { username } from "../data/GameData";
import { playerHand, isPlayerTurn, needGiveFavorCard } from "../data/PlayerData";
import { com1Player } from "../ts/com-player-scripts/ComPlayerClass";
import { bodyText, headerText, setDefaultMessageBoxProps, showMessageBox } from "../ts/global/MessageBox";
import { drawCard } from "../ts/player-scripts/DrawCard";
import { giveCardToComPlayer } from "../ts/player-scripts/HandleFavorAndSteal";
import { playCard } from "../ts/player-scripts/PlayCard";

onMount(() => {
    showMessageBox.set(true)
    setDefaultMessageBoxProps("It's your turn.", "It's your turn to start.")

    // Deals the initial 7 cards to the player
    for(let i = 0; i < 7; i++) {
        drawCard(false)
        com1Player.drawCard(false)
    }
})
</script>

<div class="game-window">
    <div>
        <div class="game-headers">
            <p class="player-header">{$username}'s Hand:</p>
            <p class="game-status">
                <GameStatus/>
            </p>
        </div>
        <div class="player-cards-container">
            {#each $playerHand as card}
                {#if $needGiveFavorCard}
                    <button on:click="{() => giveCardToComPlayer(card)}">{card}</button>
                {:else}
                    <button on:click="{() => playCard(card)}" disabled="{!$isPlayerTurn}">{card}</button>
                {/if}
           {/each}
        </div>
    </div>
    
    <div class="game-cards">
        <div class="discard-pile-container">
            <p>Discard Pile</p>
        </div>
        <div class="draw-pile-container">
            <button on:click="{() => drawCard()}" disabled="{!$isPlayerTurn}">Draw Pile</button>
        </div>
    </div>
    <MessageBox/>
</div>

<style>
    .game-cards {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .game-cards div {
        margin: 10px;
    }
    .game-headers {
        display: flex;
    }
    .game-headers .game-status {
        margin-left: auto;
    }
    .player-cards-container {
        display: flex;
    }
    .player-cards-container button {
        margin: 5px;
    }
</style>