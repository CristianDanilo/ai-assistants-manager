'use client';
import { useParams, useRouter } from 'next/navigation';
import { useAssistantStore } from '../../store/useAssitantStore';
import { useState, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, User, Bot } from 'lucide-react';

export default function TrainingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getAssistantById, updateAssistant } = useAssistantStore();

  // Obtenemos el asistente de nuestro Store persistente
  const assistant = getAssistantById(id as string);

  // Estados locales para el entrenamiento y el chat
  const [rules, setRules] = useState(assistant?.rules || '');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Guardar reglas cuando cambien (Persistencia)
  const handleSaveRules = () => {
    if (assistant) {
      updateAssistant(assistant.id, { ...assistant, rules });
      alert('¡Instrucciones de entrenamiento guardadas!');
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg = { role: 'user' as const, text: inputText };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulación de respuesta de IA (basada en el PDF)
    const responses = [
      'Entendido, ¿en qué más puedo ayudarte?',
      'Esa es una excelente pregunta. Déjame explicarte...',
      'Claro, con gusto te ayudo con eso.',
      '¿Podrías darme más detalles sobre tu consulta?',
      'Perfecto, he registrado esa información.',
    ];

    setTimeout(() => {
      const aiMsg = {
        role: 'ai' as const,
        text: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  if (!assistant) return <div className='p-20 text-center'>Asistente no encontrado.</div>;

  return (
    <div className='max-w-6xl mx-auto animate-in fade-in duration-500'>
      {/* Botón Volver */}
      <button
        onClick={() => router.push('/')}
        className='flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors'
      >
        <ArrowLeft size={20} /> Volver al panel principal
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* COLUMNA IZQUIERDA: CONFIGURACIÓN (5 columnas) */}
        <div className='lg:col-span-5 space-y-6'>
          <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-indigo-100 p-2 rounded-lg text-indigo-600'>
                <Sparkles size={20} />
              </div>
              <h2 className='text-xl font-bold'>Entrenamiento</h2>
            </div>

            <p className='text-sm text-slate-500 mb-4'>
              Define las reglas de comportamiento y conocimientos base para <strong>{assistant.name}</strong>.
            </p>

            <textarea
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              className='w-full h-64 p-4 border text-black rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm leading-relaxed'
              placeholder='Ej: Eres un asistente experto en soporte técnico. Debes ser amable y responder siempre en pasos numerados...'
            />

            <button
              onClick={handleSaveRules}
              className='w-full mt-4 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all'
            >
              Guardar Instrucciones
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: SIMULADOR DE CHAT (7 columnas) */}
        <div className='lg:col-span-7 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px]'>
          {/* Header Chat */}
          <div className='bg-white p-4 border-b flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse' />
              <span className='font-bold text-slate-700'>Prueba de interacción</span>
            </div>
            <span className='text-xs text-slate-400'>Modo: {assistant.tone}</span>
          </div>

          {/* Área de Mensajes */}
          <div className='flex-1 overflow-y-auto p-6 space-y-4'>
            {messages.length === 0 && (
              <p className='text-center text-slate-400 text-sm mt-10'>
                Envía un mensaje para probar el comportamiento.
              </p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user' ? 'bg-indigo-600' : 'bg-white border'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User size={16} className='text-white' />
                    ) : (
                      <Bot size={16} className='text-indigo-600' />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className='flex gap-2 items-center text-slate-400 text-xs animate-pulse'>
                <Bot size={14} /> El asistente está pensando...
              </div>
            )}
          </div>

          {/* Input Chat */}
          <div className='p-4 bg-white border-t'>
            <div className='flex gap-2'>
              <input
                type='text'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder='Escribe tu mensaje aquí...'
                className='flex-1 p-3 border rounded-xl outline-none focus:border-indigo-500 transition-colors text-black'
              />
              <button
                onClick={handleSendMessage}
                className='bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-transform active:scale-95'
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
