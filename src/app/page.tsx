'use client';
import { useState } from 'react';
import { useAssistantStore } from '../store/useAssitantStore';
import AssistantModal from '../components/AssistantModal';
import { Plus, BrainCircuit, Edit2, Trash2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { assistants, deleteAssistant } = useAssistantStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssistant, setEditingAssistant] = useState<any>(null);

  const handleEdit = (assistant: any) => {
    setEditingAssistant(assistant);
    setIsModalOpen(true);
  };

  return (
    <div className='space-y-8'>
      {/* HEADER DE LA PÁGINA */}
      <div className='flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100'>
        <div>
          <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Mis Asistentes IA</h1>
          <p className='text-slate-500 mt-1'>Gestiona y personaliza tus agentes inteligentes</p>
        </div>
        <button
          onClick={() => {
            setEditingAssistant(null);
            setIsModalOpen(true);
          }}
          className='flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 font-semibold'
        >
          <Plus size={20} /> Crear Asistente
        </button>
      </div>

      {/* LISTADO O ESTADO VACÍO */}
      {assistants.length === 0 ? (
        <div className='text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200'>
          <div className='bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4'>
            <BrainCircuit className='text-indigo-400' size={40} />
          </div>
          <h3 className='text-lg font-bold text-slate-800'>No hay asistentes todavía</h3>
          <p className='text-slate-500 max-w-xs mx-auto mt-2'>
            Comienza creando tu primer asistente para automatizar tus conversaciones.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {assistants.map((assistant) => (
            <div
              key={assistant.id}
              className='group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300'
            >
              <div className='p-6'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='bg-indigo-100 p-2 rounded-lg text-indigo-600'>
                    <BrainCircuit size={24} />
                  </div>
                  <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <button
                      onClick={() => handleEdit(assistant)}
                      className='p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg'
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteAssistant(assistant.id)}
                      className='p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg'
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className='text-xl font-bold text-slate-900 mb-1'>{assistant.name}</h3>
                <div className='flex gap-2 mb-6'>
                  <span className='text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md'>
                    {assistant.language}
                  </span>
                  <span className='text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-md'>
                    {assistant.tone}
                  </span>
                </div>

                <Link
                  href={`/${assistant.id}`}
                  className='flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-colors font-bold text-sm'
                >
                  <MessageSquare size={16} /> Entrenar Asistente
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <AssistantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingAssistant={editingAssistant} />
    </div>
  );
}
