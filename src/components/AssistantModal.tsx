'use client'
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Assistant, AssistantSchema } from '../types/assistant';
import { useAssistantStore } from "../store/useAssitantStore";
import { X } from 'lucide-react';

export default function AssistantModal({
  isOpen,
  onClose,
  editingAssistant,
}: {
  isOpen: boolean;
  onClose: () => void;
  editingAssistant?: Assistant;
}) {
  const [step, setStep] = useState(1);
  const addAssistant = useAssistantStore((state) => state.addAssistant);
  const updateAssistant = useAssistantStore((state) => state.updateAssistant);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
    reset,
  } = useForm<Assistant>({
    resolver: zodResolver(AssistantSchema),
    defaultValues: editingAssistant || {
      id: crypto.randomUUID(),
      audioEnabled: false,
      responseLength: { short: 30, medium: 50, long: 20 },
    },
  });

  const handleNext = async () => {
    const isStep1Valid = await trigger(['name', 'language', 'tone']);
    if (isStep1Valid) setStep(2);
    else alert('Por favor, completa los campos obligatorios correctamente.');
  };

  const onSubmit = (data: Assistant) => {
    if (editingAssistant) {
      updateAssistant(editingAssistant.id, data);
    } else {
      addAssistant(data);
    }
    reset();
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden'>
        {/* Cabecera del Modal */}
        <div className='p-6 border-b flex justify-between items-center bg-indigo-50'>
          <h2 className='text-xl font-bold text-indigo-900'>
            {editingAssistant ? 'Editar Asistente' : 'Crear Nuevo Asistente'}
          </h2>
          <button onClick={onClose} className='text-slate-400 hover:text-slate-600'>
            <X size={24} />
          </button>
        </div>

        {/* Indicador de Pasos */}
        <div className='flex px-6 pt-6 gap-2'>
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
          <div className={`h-2 flex-1 rounded-full ${step === 2 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-4'>
          {step === 1 ? (
            /* PASO 1: DATOS BÁSICOS */
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1 text-black'>Nombre del asistente *</label>
                <input
                  {...register('name')}
                  className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none'
                  placeholder='Ej. Asistente de Ventas'
                />
                {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1 text-black'>Idioma *</label>
                  <select {...register('language')} className='w-full p-2 border rounded-lg  text-black'>
                    <option value='Español'>Español</option>
                    <option value='Inglés'>Inglés</option>
                    <option value='Portugués'>Portugués</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1  text-black'>Tono *</label>
                  <select {...register('tone')} className='w-full p-2 border rounded-lg  text-black'>
                    <option value='Profesional'>Profesional</option>
                    <option value='Amigable'>Amigable</option>
                    <option value='Formal'>Formal</option>
                    <option value='Casual'>Casual</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            /* PASO 2: CONFIGURACIÓN */
            <div className='space-y-4'>
              <label className='block text-sm font-medium'>Longitud de respuestas (Total 100%) </label>
              <div className='grid grid-cols-3 gap-3'>
                {['short', 'medium', 'long'].map((len) => (
                  <div key={len}>
                    <label className='text-xs text-slate-500 capitalize'>{len}</label>
                    <input
                      type='number'
                      {...register(`responseLength.${len as 'short' | 'medium' | 'long'}`, { valueAsNumber: true })}
                      className='w-full p-2 border rounded-lg'
                    />
                  </div>
                ))}
              </div>
              {errors.responseLength?.short && (
                <p className='text-red-500 text-xs'>{errors.responseLength.short.message}</p>
              )}

              <div className='flex items-center gap-2 pt-2'>
                <input type='checkbox' {...register('audioEnabled')} id='audio' className='w-4 h-4' />
                <label htmlFor='audio' className='text-sm'>
                  Habilitar respuestas de audio
                </label>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className='flex justify-end gap-3 pt-6 border-t'>
            {step === 2 && (
              <button
                type='button'
                onClick={() => setStep(1)}
                className='px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg'
              >
                Atrás
              </button>
            )}

            {step === 1 ? (
              <button
                type='button'
                onClick={handleNext}
                className='px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
              >
                Siguiente
              </button>
            ) : (
              <button
                type='submit'
                className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
              >
                Guardar Asistente
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}