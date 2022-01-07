<script>
import { remainingTurns } from "../data/GameData";
import { isPlayerTurn } from "../data/PlayerData";
</script>

{#if $isPlayerTurn && $remainingTurns === 0}
    <p>It Is Your Turn</p> 
{:else if !$isPlayerTurn && $remainingTurns === 0}
    <p>It Is Not Your Turn</p>
{/if}

{#if $isPlayerTurn && $remainingTurns > 0}
    <p>You have {$remainingTurns} {$remainingTurns > 1 ? "turns" : "turn"} remaining</p> 
{/if}