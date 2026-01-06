import { z } from 'zod';

//Esquema de Zod para validaciones
export const AssistantSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caractere'),
  language: z.enum(['Español', 'Ingles', 'Portugués']),
  tone: z.enum(['Formal', 'Casual', 'Profesional', 'Amigable']),
  responseLength: z
    .object({
      short: z.number().min(0).max(100),
      medium: z.number().min(0).max(100),
      long: z.number().min(0).max(100),
    })
    .refine((data) => data.short + data.medium + data.long === 100, {
      message: 'La suma debe ser exactamente 100%',
      path: ['short'],
    }),
  audioEnabled: z.boolean().default(false),
  rules: z.string().optional(),
});

export type Assistant = z.infer<typeof AssistantSchema>;