'use client';
import { useParams, useRouter } from 'next/navigation';
import { useAssistantStore } from '../../store/useAssitantStore';
import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Send,
  Sparkles,
  User,
  Bot,
  Languages,
  MessageCircle,
  Mic,
  MicOff,
  Activity,
  RotateCcw,
} from 'lucide-react';

export default function TrainingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getAssistantById, updateAssistant } = useAssistantStore();

  const [assistant, setAssistant] = useState<any>(null);
  const [rules, setRules] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = getAssistantById(id as string);
    if (data) {
      setAssistant(data);
      setRules(data.rules || '');
    }
  }, [id, getAssistantById]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSaveRules = () => {
    if (assistant) {
      updateAssistant(assistant.id, { ...assistant, rules });
      alert('¡Instrucciones de entrenamiento guardadas!');
    }
  };

  const handleResetChat = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar la conversación?')) {
      setMessages([]);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg = { role: 'user' as const, text: inputText };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

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

  if (!assistant) {
    return (
      <div className='flex flex-col items-center justify-center h-screen text-slate-500'>
        <Activity className='animate-spin mb-4 text-indigo-600' size={40} />
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto animate-in fade-in duration-500 space-y-6 pb-10'>
      <button
        onClick={() => router.push('/')}
        className='flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium group'
      >
        <ArrowLeft size={20} className='group-hover:-translate-x-1 transition-transform' />
        Volver al listado
      </button>

      {/* CABECERA DE INFORMACIÓN */}
      <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div className='flex items-center gap-4'>
          <div className='bg-indigo-600 p-4 rounded-2xl text-white'>
            <Bot size={32} />
          </div>
          <div>
            <h1 className='text-2xl font-black text-slate-900'>{assistant.name}</h1>
            <div className='flex flex-wrap gap-3 mt-3'>
              <span className='flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider'>
                <Languages size={14} /> {assistant.language}
              </span>
              <span className='flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider'>
                <MessageCircle size={14} /> {assistant.tone}
              </span>
              <span
                className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  assistant.audioEnabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {assistant.audioEnabled ? <Mic size={14} /> : <MicOff size={14} />}
                Audio {assistant.audioEnabled ? 'On' : 'Off'}
              </span>
            </div>
          </div>
        </div>

        <div className='bg-slate-50 p-4 rounded-xl border border-slate-100 min-w-[180px]'>
          <p className='text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest'>Distribución</p>
          <div className='flex h-1.5 w-full rounded-full overflow-hidden bg-slate-200 mb-2'>
            <div style={{ width: `${assistant.responseLength.short}%` }} className='bg-indigo-400' />
            <div style={{ width: `${assistant.responseLength.medium}%` }} className='bg-indigo-600' />
            <div style={{ width: `${assistant.responseLength.long}%` }} className='bg-indigo-800' />
          </div>
          <p className='text-[10px] font-bold text-slate-500 text-center'>
            {assistant.responseLength.short}% | {assistant.responseLength.medium}% | {assistant.responseLength.long}%
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* PANEL DE INSTRUCCIONES */}
        <div className='lg:col-span-5'>
          <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[550px]'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-amber-100 p-2 rounded-lg text-amber-600'>
                <Sparkles size={20} />
              </div>
              <h2 className='text-lg font-bold text-slate-800'>Instrucciones</h2>
            </div>
            <textarea
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              className='flex-1 w-full p-4 border text-black rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none'
              placeholder='Define las reglas aquí...'
            />
            <button
              onClick={handleSaveRules}
              className='w-full mt-4 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95'
            >
              Guardar Instrucciones
            </button>
          </div>
        </div>

        {/* PANEL DE CHAT SIMULADO */}
        <div className='lg:col-span-7 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-[550px]'>
          <div className='bg-white p-4 border-b flex items-center justify-between shadow-sm'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
              <span className='font-bold text-slate-700 text-sm'>Chat de Prueba</span>
            </div>
            {/* --- BOTÓN DE REINICIAR --- */}
            <button
              onClick={handleResetChat}
              className='flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-tight'
              title='Limpiar chat'
            >
              <RotateCcw size={14} />
              Reiniciar
            </button>
          </div>

          <div ref={scrollRef} className='flex-1 overflow-y-auto p-6 space-y-4'>
            {messages.length === 0 && (
              <div className='flex flex-col items-center justify-center h-full opacity-30 text-slate-500'>
                <MessageCircle size={48} className='mb-2' />
                <p className='text-sm'>Inicia una conversación para probar al asistente</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                } animate-in fade-in slide-in-from-bottom-1`}
              >
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border shadow-sm'
                    }`}
                  >
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-100'
                        : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className='flex gap-2 items-center text-slate-400 text-xs font-medium animate-pulse'>
                <Bot size={14} /> {assistant.name} está escribiendo...
              </div>
            )}
          </div>

          <div className='p-4 bg-white border-t'>
            <div className='flex gap-2'>
              <input
                type='text'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder='Escribe un mensaje...'
                className='flex-1 p-3 border rounded-xl outline-none focus:border-indigo-500 text-black text-sm'
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className='bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-40'
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
