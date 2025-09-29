
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useAppContext } from '../contexts/AppContext';
import { Canvas } from '../types';

interface AICompanionPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const formatCanvasForAI = (canvas: Canvas | undefined, t: (key: string) => string): string => {
    if (!canvas) return "No canvas is currently selected.";
    const content = canvas.items.map(item => {
        const title = t(item.titleKey);
        const content = item.content || "Not filled yet.";
        return `- ${title}:\n  ${content.split('\n').join('\n  ')}`;
    }).join('\n\n');
    return `Canvas Type: ${canvas.type}\nCanvas Name: ${canvas.name}\n\nContent:\n${content}`;
};


const AICompanionPanel: React.FC<AICompanionPanelProps> = ({ isOpen, onClose }) => {
    const { state, t } = useAppContext();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // This effect manages the welcome message.
        // It runs when the panel is opened or the language changes.
        if (isOpen) {
            setMessages(prevMessages => {
                // If there are no messages yet, add the initial welcome message.
                if (prevMessages.length === 0) {
                    return [{ sender: 'ai', text: t('welcomeToAI') }];
                }
                // If there's only one message from the AI, it's the welcome message.
                // Update it in case the language has changed.
                if (prevMessages.length === 1 && prevMessages[0].sender === 'ai') {
                    // Only update if the text is actually different, to avoid re-renders.
                    if (prevMessages[0].text !== t('welcomeToAI')) {
                        return [{ sender: 'ai', text: t('welcomeToAI') }];
                    }
                }
                // For any other case (e.g., conversation has started), leave messages as they are.
                return prevMessages;
            });
        }
    }, [isOpen, t]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        
        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            
            const currentProject = state.projects.find(p => p.id === state.currentProjectId);
            const currentCanvas = currentProject?.canvases.find(c => c.id === state.currentCanvasId);
            const canvasContext = formatCanvasForAI(currentCanvas, t);

            const prompt = `
                You are a world-class senior business consultant providing expert advice.
                The user is working on a project named "${currentProject?.name || 'Unnamed Project'}".
                They are currently focused on the following strategic analysis:
                
                ${canvasContext}

                Based on this context, please provide a thoughtful, insightful, and actionable response to the user's question.
                User's question: "${input}"
            `;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            const aiMessage: Message = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Error calling AI API:", error);
            const errorMessage: Message = { sender: 'ai', text: t('aiError') };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <aside className={`bg-white border-l border-slate-200 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'w-96' : 'w-0 overflow-hidden'}`}>
             <div className="p-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
                <h3 className="text-lg font-semibold text-slate-900">{t('aiAssistant')}</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
             </div>
            <div className="flex flex-col flex-grow bg-slate-50 overflow-hidden">
                <div ref={chatBodyRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                            {msg.sender === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    AI
                                </div>
                            )}
                            <div className={`max-w-md p-3 rounded-lg whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-800'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                AI
                            </div>
                            <div className="max-w-md p-3 rounded-lg bg-white border border-slate-200 text-slate-500">
                                {t('aiThinking')}
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 border-t border-slate-200 bg-white">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t('askYourQuestion')}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors flex-shrink-0">
                            {t('send')}
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AICompanionPanel;