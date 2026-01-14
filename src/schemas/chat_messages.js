import { z } from 'zod'

const baseSchema = {
  chatId: z.number().int(),
  transmitterId: z.number().int()
}

/* 📝 MENSAJE DE TEXTO */
const textMessageSchema = z.object({
  ...baseSchema,
  type: z.literal('text'),
  textContent: z.string().min(1, 'El texto no puede estar vacío'),
  fileContent: z.null()
})

/* 🔊📷📁 MENSAJES CON ARCHIVO */
const fileMessageSchema = z.object({
  ...baseSchema,
  type: z.enum(['audio', 'image', 'file']),
  textContent: z.null(),
  fileContent: z.object({
    originalName: z.string(),
    mimeType: z.string(),
    size: z.number().int().positive(),
    url: z.string().url().optional()
  })
})

export const chatMessageSchema = z.discriminatedUnion('type', [
  textMessageSchema,
  fileMessageSchema
])

export function validateChatMessage(object) {
  return chatMessageSchema.safeParse(object)
}