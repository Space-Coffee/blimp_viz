function webSocketTask(): WebSocketIface {

    console.log("WebSocket script starting...")

    let webSocketAddr: string | null = null
    let webSocket: WebSocket | null = null

    let motorsSpeedsListeners: ((ms: MotorsSpeeds) => void)[] = []
    let servosAnglesListeners: ((sa: ServosAngles) => void)[] = []

    function webSocketUpdate() {
        if (webSocket?.url != webSocketAddr) {
            console.log(`Connecting to WebSocket at ${webSocketAddr}`)
            webSocket = new WebSocket(webSocketAddr!)
            webSocket.addEventListener("message", (msgEv) => {
                console.log(`Got WS message: ${msgEv.data}`)

                let msgObj = JSON.parse(msgEv.data)
                if (msgObj.MotorSpeed != null) {
                    let motorsSpeeds: MotorsSpeeds = msgObj.MotorSpeed as MotorsSpeeds
                    console.log("motorsSpeeds: ", motorsSpeeds)
                    for (const listener of motorsSpeedsListeners) {
                        listener(motorsSpeeds)
                    }
                }
                else if (msgObj.ServoPosition != null) {
                    let servosAngles: ServosAngles = msgObj.ServoPosition as ServosAngles
                    console.log("servosAngles: ", servosAngles)
                    for (const listener of servosAnglesListeners) {
                        listener(servosAngles)
                    }
                }
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

    return {
        updateWSAddr: updateWSAddr,
        declareInterest: declareInterest,
        subscribeMotorsSpeeds: (listener: (ms: MotorsSpeeds) => void) => {
            motorsSpeedsListeners.push(listener)
        },
        subscribeServosAngles: (listener: (sa: ServosAngles) => void) => {
            servosAnglesListeners.push(listener)
        }
    }
}

interface WebSocketIface {
    updateWSAddr: (addr: string) => void,
    declareInterest: (interest: VizInterest) => void,
    subscribeMotorsSpeeds: (listener: (ms: MotorsSpeeds) => void) => void,
    subscribeServosAngles: (listener: (sa: ServosAngles) => void) => void
}

interface VizInterest {
    motors: boolean,
    servos: boolean
}

interface MotorsSpeeds {
    id: number,
    speed: number
}

interface ServosAngles {
    id: number,
    angle: number
}

export default webSocketTask
export type { WebSocketIface, VizInterest }