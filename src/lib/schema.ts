// See https://github.com/Space-Coffee/blimp_ground_ws_interface/blob/master/src/lib.rs

import {z} from "zod";

export const VizInterestSchema = z.object({
    motors: z.boolean(),
    servos: z.boolean(),
    sensors: z.boolean(),
})
export type VizInterest = z.infer<typeof VizInterestSchema>

export const MotorSpeedSchema = z.object({
    id: z.number(),
    speed: z.number()
})
export type MotorSpeed = z.infer<typeof MotorSpeedSchema>

export const ServoPositionSchema = z.object({
    id: z.number(),
    angle: z.number()
})
export type ServoPosition = z.infer<typeof ServoPositionSchema>

export const SensorDataSchema = z.object({
    id: z.string(),
    data: z.number(),
})
export type SensorData = z.infer<typeof SensorDataSchema>

export const MessageG2VSchema =
    z.object({MotorSpeed: MotorSpeedSchema})
        .or(z.object({ServoPosition: ServoPositionSchema}))
        .or(z.object({SensorData: SensorDataSchema}))
export type MessageG2V = z.infer<typeof MessageG2VSchema>

export const MessageV2GSchema = z.object({
    DeclareInterest: VizInterestSchema
})
export type MessageV2G = z.infer<typeof MessageV2GSchema>

