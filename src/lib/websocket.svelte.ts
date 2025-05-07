import {type MessageG2V, MessageG2VSchema, type MessageV2G} from "$lib/schema";
import {motors, sensors, servos} from "$lib/blimp-state.svelte";


export class WebSocketManager {
    private webSocket: WebSocket | null = $state(null)
    connected: boolean = $derived(this.webSocket !== null)

    private onOpen() {
        console.log("WS connected")
        this.sendMessage({DeclareInterest: {motors: true, sensors: true, servos: true}})
    }

    private onClose(event: CloseEvent) {
        console.log(`WS closed: ${event.code}, ${event.reason}`)
        this.webSocket = null;
    }

    private onMessage(data: string) {
        const message: MessageG2V = this.parseMessage(data)
        this.handleMessage(message)
    }

    private parseMessage(data: string): MessageG2V {
        const parsed: object = JSON.parse(data)
        const result = MessageG2VSchema.safeParse(parsed)
        if (!result.success) throw new Error(`Received data doesn't match the protocol: ${result.error.message}`)
        return result.data
    }

    protected handleMessage(message: MessageG2V) {
        if ("MotorSpeed" in message) {
            motors.set(message.MotorSpeed.id, message.MotorSpeed.speed)
            return
        }
        if ("ServoPosition" in message) {
            servos.set(message.ServoPosition.id, message.ServoPosition.angle)
            return
        }
        if ("SensorData" in message) {
            sensors.set(message.SensorData.id, message.SensorData.data)
            return
        }
    }


    async connect(address: string) {
        if (this.connected) { throw new Error("WebSocket is already connected") }
        this.webSocket = await new Promise((resolve, reject) => {
            const webSocket = new WebSocket(`ws://${address}`, ["spacecoffee.blimp.v1.json"])
            webSocket.onopen = () => {
                resolve(webSocket)
            }
            webSocket.onmessage = (event: MessageEvent) => this.onMessage(event.data)
            webSocket.onclose = (event: CloseEvent) => this.onClose(event)
            webSocket.onerror = (error) => {
                reject(error)
            }
        })
        this.onOpen()
    }

    disconnect() {
        if (!this.connected) { throw new Error("WebSocket already disconnected") }
        this.webSocket!.close()
    }

    sendMessage(message: MessageV2G) {
        if (!this.connected) { throw new Error("WebSocket not connected") }
        this.webSocket!.send(JSON.stringify(message))
    }
}

export const webSocketManager = new WebSocketManager()