"use server"

import { db } from "@/lib/db"
import { programsTable } from "@/lib/db/schema"
import { ProgramInput } from "@/typings"

// TODO: Restrict to users

export const getPrograms = async () => {
  const programs = await db.query.programsTable.findMany()
  return programs

}

export const getProgramById = async (id: string) => {
  const program = await db.query.programsTable.findFirst({
    where: (programs, { eq }) => eq(programs.id, id),
  })
  return program
}


export const createProgram = async (program: ProgramInput) => {
  const createdProgram = await db.insert(programsTable).values(program).returning()
  return createdProgram[0]
}

