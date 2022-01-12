<script lang="ts">
import { get } from "svelte/store";

import { bodyText, closeButtonCustomFunction, closeButtonText, headerText, showMessageBox, showSeeTheFutureMessageBox } from "../../ts/global/MessageBox";
import SeeTheFutureMessageBox from "./SeeTheFutureMessageBox.svelte";

const closeMessageBox = () => {
    showMessageBox.set(false)

    get(closeButtonCustomFunction)()
}
</script>

{#if $showMessageBox}
    <div class="message-box">
        <div class="default-message-box">
            <h2>{$headerText}</h2>
            <p>{$bodyText}</p>
        </div>
        {#if $showSeeTheFutureMessageBox }
            <SeeTheFutureMessageBox/>
        {/if}
        <button on:click="{closeMessageBox}">{$closeButtonText}</button>
    </div>
{/if}

<style>
    .message-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        background: var(--background-color);
        border: var(--border-color) 5px dashed;

        padding: 20px;
    }
</style>