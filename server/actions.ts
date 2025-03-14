"use server"

import { Program, ProgramInput, ProgramSchedule, ProgramScheduleInput } from "@/typings";
import { createProgramClient } from "./clients"
import { createProgram } from "./programs"
import { createProgramSchedule } from "./schedule";


export type CreateProgramClientActionState = {
  data: { clientKey: string } | null;
  error: null | string;
  success?: boolean;
}

export const createProgramClientAction = async (_state: CreateProgramClientActionState, formData: FormData) => {
  const clientKey = formData.get('clientKey') as string
  const programId = formData.get('programId') as string

  try {
    await createProgramClient(programId, clientKey)
    return {
      data: null,
      error: null,
      success: true,
    } as CreateProgramClientActionState
  }
  catch (error) {
    console.log(error)
    let message = 'Failed to add client'
    if (error instanceof Error && error.message) {
      message = error.message
    }
    return {
      data: { clientKey },
      error: message,
      success: false,
    } as CreateProgramClientActionState
  }
}

export type CreateProgramActionState = {
  data: Program | null;
  error: null | string;
  success?: boolean;
}

export const createProgramAction = async (_state: CreateProgramActionState, formData: FormData) => {
  const rawProgram: ProgramInput = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    date: formData.get("date") as string
    // startTime: formData.get("startTime") as string,
    // endTime: formData.get("endTime") as string
  }

  try {
    const createdProgram = await createProgram(rawProgram)
    return {
      data: createdProgram,
      error: null,
      success: true,
    } as CreateProgramActionState
  }
  catch (error) {
    console.log(error)
    let message = 'Failed to create program'
    if (error instanceof Error && error.message) {
      message = error.message
    }
    return {
      data: rawProgram,
      error: message,
      success: false,
    } as CreateProgramActionState
  }
}

export type CreateProgramScheduleActionState = {
  data: ProgramSchedule | null;
  error: null | string;
  success?: boolean;
}

export const createProgramScheduleAction = async (_state: CreateProgramScheduleActionState, formData: FormData) => {
  const rawSchedule: ProgramScheduleInput = {
    title: formData.get("title") as string,
    programId: formData.get("programId") as string,
  }

  try {
    const createdSchedule = await createProgramSchedule(rawSchedule)
    return {
      data: createdSchedule,
      error: null,
      success: true,
    } as CreateProgramScheduleActionState
  }
  catch (error) {
    console.log(error)
    let message = 'Failed to create schedule'
    if (error instanceof Error && error.message) {
      message = error.message
    }
    return {
      data: rawSchedule,
      error: message,
      success: false,
    } as CreateProgramScheduleActionState
  }
}