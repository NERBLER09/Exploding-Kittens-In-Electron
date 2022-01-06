<script>

import { isPlayerTurn } from "../data/PlayerData";

</script>
{#if $isPlayerTurn}
    <p>It Is Your Turn</p> 
{:else}
    <p>It Is Not Your Turn</p>
{/if}