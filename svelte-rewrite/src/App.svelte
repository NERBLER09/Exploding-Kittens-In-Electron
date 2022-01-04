<script>
import { showGameScreen } from "./data/GameData";

    import GameWindow from "./pages/GameWindow.svelte"
import TitleScreen from "./pages/TitleScreen.svelte";
</script>

{#if $showGameScreen}
    <GameWindow/>
{:else}
    <TitleScreen/>
{/if}