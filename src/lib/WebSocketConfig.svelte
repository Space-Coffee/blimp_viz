<script lang="ts">
    import {webSocketManager} from "$lib/websocket.svelte";

    let address: string = $state("localhost:8765");
    let connecting: boolean = $state(false);

    async function connect() {
        connecting = true
        await webSocketManager.connect(address).catch(() => {})
        connecting = false
    }
</script>

<div>
    <h2>WebSocket config</h2>
    <form>
        <label for="ws-address">Address:</label>
        <input name="ws-address" bind:value={address} />

        {#if webSocketManager.connected}
            <button type="submit" onclick={() => webSocketManager.disconnect()} class="disconnect">
                DISCONNECT
            </button>
        {:else}
            <button onclick={connect} disabled={connecting} class="connect">
                CONNECT
            </button>
        {/if}
    </form>
</div>

<style>
    button.disconnect {
        color: green;
    }
    button.connect {
        color: red;
    }
    button.connect:disabled {
        color: yellow;
    }

</style>
