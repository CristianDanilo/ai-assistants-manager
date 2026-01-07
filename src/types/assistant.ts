import { z } from 'zod';

export const AssistantSchema = z.object({
  id: z.string().uuid().optional(),

  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),

  language: z.enum(['Español', 'Inglés', 'Portugués']),
  tone: z.enum(['Formal', 'Casual', 'Profesional', 'Amigable']),

  responseLength: z
    .object({
      short: z
        .number()
        .min(0, { message: 'Debe ser mayor o igual a 0' })
        .max(100, { message: 'Debe ser menor o igual a 100' }),

      medium: z
        .number()
        .min(0, { message: 'Debe ser mayor o igual a 0' })
        .max(100, { message: 'Debe ser menor o igual a 100' }),

      long: z
        .number()
        .min(0, { message: 'Debe ser mayor o igual a 0' })
        .max(100, { message: 'Debe ser menor o igual a 100' }),
    })
    .refine(({ short, medium, long }) => short + medium + long === 100, {
      message: 'La suma de las longitudes debe ser exactamente 100%',
      path: ['short'],
    }),

  audioEnabled: z.boolean(),
  rules: z.string().optional(),
});

export type Assistant = z.infer<typeof AssistantSchema>;
