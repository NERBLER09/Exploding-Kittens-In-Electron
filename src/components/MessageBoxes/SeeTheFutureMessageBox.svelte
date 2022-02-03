<script lang="ts">
import { seeTheFutureCards } from "../../data/GameData";
</script>

<div class="see-the-future-message-box">
    {#each $seeTheFutureCards as card}
        <button>{card}</button>
    {/each}
</div>