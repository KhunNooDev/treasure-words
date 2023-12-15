import { PrismaClient } from "@prisma/client";
import prisma from "@/database/prismadb";

/**
 * Retrieve all records for a given Prisma model.
 * @param model - The name of the Prisma model.
 * @returns A promise that resolves to an array of all records.
 */
export async function selectAll<T extends keyof PrismaClient>(model: T): Promise<any[]> {
  try {
    // Use PrismaClient to find many records for the specified model
    const results = await (prisma[model] as any).findMany();
    return results;
  } catch (error) {
    // Log and rethrow errors that occur during the operation
    console.error(`Error selecting all records for ${String(model)}:`, error);
    throw error;
  }
}

/**
 * Retrieve a record by its ID.
 * @param model - The name of the Prisma model.
 * @param id - The ID of the record to retrieve.
 * @returns A promise that resolves to the retrieved record.
 */
export async function selectById<T extends keyof PrismaClient>(model: T, { id }: { id: string }): Promise<any | null> {
  try {
    // Use PrismaClient to find a unique record for the specified model and ID
    const result = await (prisma[model] as any).findUnique({
      where: {
        id: id,
      },
    });

    return result;
  } catch (error) {
    // Log and rethrow errors that occur during the operation
    console.error(`Error selecting record for ${String(model)} with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new record for a given Prisma model.
 * @param model - The name of the Prisma model.
 * @param data - The data to be inserted into the new record.
 * @returns A promise that resolves to the created record.
 */
export async function create<T extends keyof PrismaClient>(model: T, data: any): Promise<any> {
  try {
    // Use PrismaClient to create a new record for the specified model with the provided data
    const result = await (prisma[model] as any).create({
      data: {
        ...data,
      },
    });

    return result;
  } catch (error) {
    // Log and rethrow errors that occur during the operation
    console.error(`Error creating record for ${String(model)}:`, error);
    throw error;
  }
}

/**
 * Update a record by its ID.
 * @param model - The name of the Prisma model.
 * @param id - The ID of the record to update.
 * @param data - The partial data to update in the record.
 * @returns A promise that resolves to the updated record.
 */
export async function updateById<T extends keyof PrismaClient>(model: T, { id, data }: { id: string; data: Partial<PrismaClient[T]>}): Promise<any | null> {
  try {
    // Use PrismaClient to update a record for the specified model and ID with the provided data
    const result = await (prisma[model] as any).update({
      where: { id: id },
      data: { ...data },
    });
    return result;
  } catch (error) {
    // Log and rethrow errors that occur during the operation
    console.error(`Error updating record for ${String(model)} with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a record by its ID.
 * @param model - The name of the Prisma model.
 * @param id - The ID of the record to delete.
 * @returns A promise that resolves to the deleted record.
 */
export async function deleteById<T extends keyof PrismaClient>(model: T, { id }: { id: string }): Promise<any | null> {
  try {
    // Use PrismaClient to delete a record for the specified model and ID
    const result = await (prisma[model] as any).delete({
      where: { id: id },
    });
    return result;
  } catch (error) {
    // Log and rethrow errors that occur during the operation
    console.error(`Error deleting record for ${String(model)} with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Close the Prisma client to release the connection.
 * @returns A promise that resolves when the client is disconnected.
 */
export const closePrismaClient = async () => {
  // Disconnect the Prisma client to release the connection resources
  await prisma.$disconnect();
};
