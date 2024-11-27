<script lang="ts">
    import type { WebSocketIface } from "./websocket_comm";

    let { wsIface }: { wsIface: WebSocketIface } = $props();

    let wsAddrCurr: string = "";
</script>

<div>
    <h2>WebSocket config</h2>
    <input bind:value={wsAddrCurr} />
    <button
        onclick={() => {
            wsIface.updateWSAddr(wsAddrCurr);
        }}
    >
        Update
    </button>
</div>
