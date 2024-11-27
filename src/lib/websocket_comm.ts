function webSocketTask(): WebSocketIface {

    console.log("WebSocket script starting...")

    let webSocketAddr: string | null = null
    let webSocket: WebSocket | null = null
    function webSocketUpdate() {
        if (webSocket?.url != webSocketAddr) {
            console.log(`Connecting to WebSocket at ${webSocketAddr}`)
            webSocket = new WebSocket(webSocketAddr!)
            webSocket.addEventListener("message", (msgEv) => {
                console.log(`Got WS message: ${msgEv.data}`)
                return null
            })
        }
    }
    let updateWSAddr = (addr: string) => {
        webSocketAddr = addr
        webSocketUpdate()
    }
    let declareInterest = (interest: VizInterest) => {
        webSocket?.send(JSON.stringify({ DeclareInterest: { motors: interest.motors, servos: interest.servos } }))
    }

    return { updateWSAddr: updateWSAddr, declareInterest: declareInterest }
}

interface WebSocketIface {
    updateWSAddr: (addr: string) => void,
    declareInterest: (interest: VizInterest) => void
}

interface VizInterest {
    motors: boolean;
    servos: boolean;
}

export default webSocketTask
export type { WebSocketIface, VizInterest }