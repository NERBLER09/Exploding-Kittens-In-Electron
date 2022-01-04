<script>
import { username } from "../data/GameData";
</script>

<div class="game-window">
    <div class="player-cards-container">
        <div class="game-headers">
            <p class="player-header">{$username}'s Hand:</p>
            <p class="game-status">Game Status</p>
        </div>
        <div class="player-cards-container"></div>
    </div>
    
    <div class="game-cards">
        <div class="discard-pile-container">
            <p>Discard Pile</p>
        </div>
        <div class="draw-pile-container">
            <button>Draw Pile</button>
        </div>
    </div>
</div>

<style>
    .game-cards {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
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
</style>