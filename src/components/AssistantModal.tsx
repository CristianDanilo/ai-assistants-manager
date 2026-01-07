'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Assistant, AssistantSchema } from '../types/assistant';
import { useAssistantStore } from '../store/useAssitantStore';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

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
      name: '',
      language: 'Español',
      tone: 'Profesional',
      audioEnabled: false,
      responseLength: { short: 30, medium: 50, long: 20 },
    },
  });

  // Monitoreo de la suma total para UX ---
  const responseValues = watch('responseLength');
  const totalPercentage =
    (Number(responseValues?.short) || 0) + (Number(responseValues?.medium) || 0) + (Number(responseValues?.long) || 0);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Errores de validación activos:', errors);
    }
  }, [errors]);

  const handleNext = async () => {
    const isStep1Valid = await trigger(['name', 'language', 'tone']);
    if (isStep1Valid) setStep(2);
  };

const onSubmit = (data: Assistant) => {
  console.log('Enviando datos válidos:', data);

  if (editingAssistant) {
    updateAssistant(editingAssistant?.id, {
      ...data,
      id: editingAssistant.id,
    });
  } else {
    addAssistant({
      ...data,
      id: crypto.randomUUID(),
    });
  }

  handleClose();
};

  const handleClose = () => {
    reset();
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200'>
        {/* Cabecera del Modal */}
        <div className='p-6 border-b flex justify-between items-center bg-slate-50'>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>
              {editingAssistant ? 'Editar Asistente' : 'Configurar Asistente'}
            </h2>
            <p className='text-xs text-indigo-600 font-semibold uppercase mt-1'>
              Paso {step} de 2: {step === 1 ? 'Datos Básicos' : 'Personalización'}
            </p>
          </div>
          <button onClick={handleClose} className='text-slate-400 hover:text-slate-600 transition-colors p-2'>
            <X size={24} />
          </button>
        </div>

        {/* Indicador de Pasos Visual */}
        <div className='flex px-8 pt-6 gap-3'>
          <div
            className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-200'}`}
          />
          <div
            className={`h-1.5 flex-1 rounded-full transition-colors ${step === 2 ? 'bg-indigo-600' : 'bg-slate-200'}`}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='p-8 space-y-5'>
          {step === 1 ? (
            /* PASO 1: DATOS BÁSICOS */
            <div className='space-y-4 animate-in fade-in slide-in-from-right-4 duration-300'>
              <div>
                <label className='block text-sm font-semibold mb-2 text-slate-700'>Nombre del asistente *</label>
                <input
                  {...register('name')}
                  className={`w-full text-slate-700 p-3 border rounded-xl outline-none transition-all ${
                    errors.name
                      ? 'border-red-500 ring-4 ring-red-50'
                      : 'focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500'
                  }`}
                  placeholder='Ej. Asistente de Ventas'
                />
                {errors.name && (
                  <p className='text-red-500 text-xs mt-2 flex items-center gap-1'>
                    <AlertCircle size={12} /> {errors.name.message}
                  </p>
                )}
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold mb-2 text-slate-700'>Idioma *</label>
                  <select
                    {...register('language')}
                    className='w-full p-3 border rounded-xl bg-white text-slate-900 focus:border-indigo-500 outline-none'
                  >
                    <option value='Español'>Español</option>
                    <option value='Inglés'>Inglés</option>
                    <option value='Portugués'>Portugués</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-semibold mb-2 text-slate-700'>Tono *</label>
                  <select
                    {...register('tone')}
                    className='w-full p-3 border rounded-xl bg-white text-slate-900 focus:border-indigo-500 outline-none'
                  >
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
            <div className='space-y-6 animate-in fade-in slide-in-from-right-4 duration-300'>
              <div>
                <div className='flex justify-between items-center mb-3 '>
                  <label className='text-sm font-semibold text-slate-700'>Distribución de respuestas</label>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-md ${
                      totalPercentage === 100 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    Suma: {totalPercentage}%
                  </span>
                </div>

                <div className='grid grid-cols-3 gap-3 text-slate-700'>
                  {['short', 'medium', 'long'].map((len) => (
                    <div key={len}>
                      <label className='text-[10px] uppercase font-bold text-slate-600 mb-1 block'>
                        {len === 'short' ? 'Corto' : len === 'medium' ? 'Medio' : 'Largo'}
                      </label>
                      <input
                        type='number'
                        {...register(`responseLength.${len as 'short' | 'medium' | 'long'}`, { valueAsNumber: true })}
                        className='w-full p-3 border rounded-xl text-center font-semibold focus:border-indigo-500 outline-none'
                      />
                    </div>
                  ))}
                </div>
                {errors.responseLength?.short && (
                  <p className='text-red-500 text-xs mt-3 bg-red-50 p-2 rounded-lg'>
                    {errors.responseLength.short.message}
                  </p>
                )}
                {totalPercentage === 100 && !errors.responseLength?.short && (
                  <p className='text-green-600 text-[10px] mt-2 flex items-center gap-1 font-medium'>
                    <CheckCircle2 size={12} /> ¡Distribución perfecta!
                  </p>
                )}
              </div>

              <div className='flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors'>
                <input type='checkbox' {...register('audioEnabled')} id='audio' className='w-5 h-5 accent-indigo-600' />
                <label htmlFor='audio' className='text-sm font-medium text-slate-700 cursor-pointer flex-1'>
                  Habilitar respuestas de audio (Opcional)
                </label>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          {/* Botones de acción - Corregido para evitar submit accidental */}
          <div className='flex justify-end gap-3 pt-6 border-t mt-4'>
            {step === 2 && (
              <button
                type='button' 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setStep(1);
                }}
                className='px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors'
              >
                Atrás
              </button>
            )}

            {step === 1 ? (
              <button
                type='button'
                onClick={async (e) => {
                  e.preventDefault(); // Bloquea cualquier acción por defecto del navegador
                  e.stopPropagation(); // Evita que el evento "suba" al formulario

                  const isStep1Valid = await trigger(['name', 'language', 'tone']);
                  if (isStep1Valid) {
                    setStep(2);
                  } else {
                    console.log('Paso 1 no válido');
                  }
                }}
                className='flex-1 md:flex-none px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all'
              >
                Siguiente
              </button>
            ) : (
              <button
                type='submit' // ÚNICO botón que debe ser submit
                disabled={totalPercentage !== 100}
                className='flex-1 md:flex-none px-8 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none'
              >
                {editingAssistant ? 'Guardar Cambios' : 'Finalizar Creación'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
