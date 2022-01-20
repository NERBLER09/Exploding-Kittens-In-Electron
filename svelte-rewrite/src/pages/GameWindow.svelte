<script lang="ts">
    import { onMount } from "svelte";
    import GameStatus from "../components/GameStatus.svelte";
    import MessageBox from "../components/MessageBoxes/MessageBox.svelte";

    import { cards, username } from "../data/GameData";
    import {
        playerHand,
        isPlayerTurn,
    } from "../data/PlayerData";
    import {
        com1Player,
        com2Player,
        com3Player,
    } from "../ts/com-player-scripts/ComPlayerClass";
    import {
        setDefaultMessageBoxProps,
        showMessageBox,
    } from "../ts/global/MessageBox";
    import { drawCard } from "../ts/player-scripts/DrawCard";
    import { giveCardToComPlayer } from "../ts/player-scripts/HandleFavorAndSteal";
    import { playCard } from "../ts/player-scripts/PlayCard";

    onMount(() => {
        showMessageBox.set(true);
        setDefaultMessageBoxProps(
            "It's your turn.",
            "It's your turn to start."
        );

        // Deals the initial 7 cards to the player
        for (let i = 0; i < 7; i++) {
            drawCard(false);
            com1Player.drawCard(false);
            com2Player.drawCard(false);
            com3Player.drawCard(false);
        }
    });
</script>

<div class="game-window">
    <div>
        <div class="game-headers">
            <p class="player-header">{$username}'s Hand:</p>
            <p class="game-status">
                <GameStatus />
            </p>
        </div>
        <div class="player-cards-container">
            {#each $playerHand as card}
                {#if $isPlayerTurn}
                    <div class="player-card" on:click={() => playCard(card)}>
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <img
                            disabled={!$isPlayerTurn}
                            src="images/cards/{card}.svg"
                        />
                    </div>
                {:else}
                    <div class="player-card {$isPlayerTurn ? "" : "disabled"}" on:click={() => giveCardToComPlayer(card)}>
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <img
                            src="images/cards/{card}.svg"
                        />
                    </div>
                {/if}
            {/each}
        </div>
    </div>

    <div class="game-cards">
        <div class="discard-pile-container">
            <p>Discard Pile</p>
        </div>
        <div class="draw-pile-container">
            <button on:click={() => drawCard()} disabled={!$isPlayerTurn}
                >Draw Pile</button
            >
        </div>
    </div>
    <MessageBox />
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

        overflow-y: hidden;
        /* height: fit-content; */
        min-height: 150px;
    }
    .player-cards-container .player-card:not(.disabled) {
        transition: transform 200ms;
        transition-timing-function: ease-in;
        box-shadow: -1rem 0 3rem #000;
    }
    .player-card:hover:not(.disabled) {
        transform: scale(1.1);
    }
    .player-card.disabled {
        filter: grayscale(1);
    }
    .player-card img {
        height: 20vh;
        min-height: 200px;
    }
</style>
