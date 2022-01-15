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
        <div class="close-button-container">
            <button on:click="{closeMessageBox}">{$closeButtonText}</button>
        </div>
    </div>
{/if}

<style>
    .message-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        background: var(--background-color);
        border: var(--border-color) 1vh dashed;

        padding: 20px;
    }

    .close-button-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-button-container button {
        width: 100%;
        max-width: none !important;
    }

    button {
        margin: 10px;
    }
</style>