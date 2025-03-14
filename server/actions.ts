"use server"

import { Program, ProgramInput } from "@/typings";
import { createProgramClient } from "./clients"
import { createProgram } from "./programs"


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