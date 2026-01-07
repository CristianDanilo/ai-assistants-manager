'use client';
import { useState } from 'react';
import { useAssistantStore } from '@/store/useAssitantStore';
import AssistantModal from '@/components/AssistantModal';
import {
  Plus,
  BrainCircuit,
  Edit2,
  Trash2,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Languages,
  MessageCircle,
  Mic,
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { assistants, deleteAssistant } = useAssistantStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssistant, setEditingAssistant] = useState<any>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const confirmDelete = () => {
    if (deleteId) {
      deleteAssistant(deleteId);
      setDeleteId(null);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 p-4 md:p-8'>
      {/* NOTIFICACIÓN DE ÉXITO */}
      {showToast && (
        <div className='fixed top-5 right-5 z-[100] animate-in slide-in-from-top duration-300'>
          <div className='bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3'>
            <CheckCircle size={20} />
            <span className='font-bold text-sm'>Eliminado correctamente</span>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMACIÓN ELIMINAR */}
      {deleteId && (
        <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200'>
            <div className='text-center'>
              <AlertTriangle className='mx-auto text-red-500 mb-4' size={40} />
              <h3 className='text-lg font-bold text-slate-900'>¿Eliminar asistente?</h3>
              <p className='text-slate-500 text-sm mt-2'>Esta acción borrará toda la configuración permanentemente.</p>
              <div className='flex gap-3 mt-6'>
                <button
                  onClick={() => setDeleteId(null)}
                  className='flex-1 py-2 text-slate-500 font-semibold hover:bg-slate-100 rounded-lg'
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className='flex-1 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors'
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ESTRUCTURA PRINCIPAL (LAYOUT 80/20) --- */}
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* PARTE IZQUIERDA: 80% - TÍTULO Y LISTADO EN FILAS */}
        <div className='lg:w-[80%] space-y-6'>
          <div>
            <h1 className='text-4xl font-black text-slate-900 tracking-tight uppercase'>Asistentes IA</h1>
            <p className='text-slate-500 font-medium'>Gestiona y entrena tus agentes virtuales</p>
          </div>

          {/* LISTADO EN FILAS */}
          <div className='space-y-4'>
            {assistants.length === 0 ? (
              <div className='bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center'>
                <BrainCircuit className='mx-auto text-slate-300 mb-4' size={48} />
                <p className='text-slate-500 font-medium'>No hay asistentes creados todavía.</p>
              </div>
            ) : (
              assistants.map((assistant) => (
                <div
                  key={assistant.id}
                  className='bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-indigo-300 hover:shadow-md transition-all group'
                >
                  {/* Info Principal */}
                  <div className='flex items-center gap-4 flex-1'>
                    <div className='bg-indigo-600 p-3 rounded-xl text-white'>
                      <BrainCircuit size={24} />
                    </div>
                    <div>
                      <h3 className='font-bold text-slate-900 text-lg'>{assistant.name}</h3>
                      <div className='flex gap-3 mt-1'>
                        <span className='flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                          <Languages size={12} /> {assistant.language}
                        </span>
                        <span className='flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                          <MessageCircle size={12} /> {assistant.tone}
                        </span>
                        {assistant.audioEnabled && (
                          <span className='flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase tracking-wider'>
                            <Mic size={12} /> Audio
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Visualización de Porcentajes (Barra compacta) */}
                  <div className='w-full md:w-48 space-y-1'>
                    <div className='flex h-1.5 w-full rounded-full overflow-hidden bg-slate-100'>
                      <div style={{ width: `${assistant.responseLength.short}%` }} className='bg-indigo-300' />
                      <div style={{ width: `${assistant.responseLength.medium}%` }} className='bg-indigo-500' />
                      <div style={{ width: `${assistant.responseLength.long}%` }} className='bg-indigo-700' />
                    </div>
                    <div className='flex justify-between text-[9px] font-bold text-slate-400 uppercase'>
                      <span>S:{assistant.responseLength.short}%</span>
                      <span>M:{assistant.responseLength.medium}%</span>
                      <span>L:{assistant.responseLength.long}%</span>
                    </div>
                  </div>

                  {/* Acciones en Fila */}
                  <div className='flex items-center gap-2 border-l border-slate-100 pl-4'>
                    <Link
                      href={`/${assistant.id}`}
                      className='flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl 
             font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg 
             shadow-indigo-200 hover:scale-[1.02]'
                      title='Entrenar'
                    >
                      Entrenar
                      <MessageSquare size={18} />
                    </Link>
                    <button
                      onClick={() => {
                        setEditingAssistant(assistant);
                        setIsModalOpen(true);
                      }}
                      className='p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors'
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (assistant.id) {
                          setDeleteId(assistant.id);
                        }
                      }}
                      className='p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors'
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* PARTE DERECHA: 20% - PANEL DE ACCIÓN */}
        <div className='lg:w-[20%]'>
          <div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-8 text-center'>
            <div className='bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600'>
              <Plus size={24} />
            </div>
            <h4 className='font-bold text-slate-800 mb-2'>Nuevo Agente</h4>
            <p className='text-xs text-slate-500 mb-6'>Configura un nuevo asistente de IA en pocos pasos.</p>
            <button
              onClick={() => {
                setEditingAssistant(null);
                setIsModalOpen(true);
              }}
              className='w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2'
            >
              <Plus size={18} /> Crear Asistente
            </button>

            <div className='mt-8 pt-6 border-t border-slate-100 text-[10px] text-slate-400 font-medium uppercase tracking-widest'>
              AI System
            </div>
          </div>
        </div>
      </div>

      <AssistantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingAssistant={editingAssistant} />
    </div>
  );
}
