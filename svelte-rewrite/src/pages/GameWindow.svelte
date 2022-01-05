<script lang="ts">
import { onMount } from "svelte";

import { username } from "../data/GameData";
import { playerHand, isPlayerTurn } from "../data/PlayerData";
import { drawCard } from "../ts/player-scripts/DrawCard";
import { playCard } from "../ts/player-scripts/PlayCard";

onMount(() => {
    // Deals the initial 7 cards to the player
    for(let i = 0; i < 7; i++) {
        drawCard(false)
    }
})
</script>

<div class="game-window">
    <div>
        <div class="game-headers">
            <p class="player-header">{$username}'s Hand:</p>
            <p class="game-status">Game Status</p>
        </div>
        <div class="player-cards-container">
            {#each $playerHand as card}
                <button on:click="{() => playCard(card)}">{card}</button>
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