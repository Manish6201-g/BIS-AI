import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Mic, 
  Volume2, 
  VolumeX, 
  ThumbsUp, 
  ThumbsDown, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Globe, 
  RefreshCw,
  ExternalLink,
  Info,
  Check
} from 'lucide-react';
import { chatService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { ClauseDrawer } from '../components/ClauseDrawer';
import { VoiceModal } from '../components/VoiceModal';

export const AssistantPage = () => {
  const { currentLang, setCurrentLang, languages } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: currentLang === 'hi' 
        ? "नमस्ते! मैं बीआईएसमार्ट एआई (BISmart AI) हूँ — भारतीय मानक ब्यूरो (BIS) का आधिकारिक सहायक। आप किसी भी उत्पाद, भारतीय मानक (IS कोड), अनिवार्य QCO आदेश या प्रमाणन प्रक्रिया के बारे में प्रश्न पूछ सकते हैं।"
        : "Hello! I am BISmart AI — your intelligent assistant for Indian Standards (IS), Bureau of Indian Standards (BIS) certification procedures, Quality Control Orders (QCOs), and product authenticity. How may I assist you today?",
      query_classification: "General BIS question",
      sources: []
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  
  // Drawer state
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Voice state
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);

  // Feedback state
  const [feedbackSent, setFeedbackSent] = useState({});

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    { text: "What is the BIS standard applicable to cement?", label: "Cement Standard" },
    { text: "What is the safety valve requirement for pressure cookers?", label: "Pressure Cooker Safety" },
    { text: "What is the standard for packaged drinking water?", label: "Packaged Water Limits" },
    { text: "How to verify HUID for gold jewellery hallmarking?", label: "Gold HUID Verification" },
    { text: "प्रेशर कुकर पर कौन सा बीआईएस मानक लागू होता है?", label: "प्रेशर कुकर मानक (Hindi)" }
  ];

  const handleSendMessage = async (queryText = inputQuery) => {
    const textToSend = queryText.trim();
    if (!textToSend || loading) return;

    setInputQuery('');
    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      sources: []
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await chatService.sendMessage(textToSend, currentLang, sessionId);
      const data = response.data;
      if (data.session_id) setSessionId(data.session_id);

      const assistantMsg = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        query_classification: data.query_classification,
        sources: data.sources || [],
        language: data.language
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: "I could not find sufficient information in the available BIS sources to answer this reliably.",
          sources: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceTranscript = (transcript) => {
    handleSendMessage(transcript);
  };

  const toggleSpeech = (msg) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === msg.id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(msg.content.replace(/[#*`>]/g, ''));
    utterance.lang = msg.language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);
    setSpeakingMessageId(msg.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleFeedback = async (msgId, rating) => {
    setFeedbackSent(prev => ({ ...prev, [msgId]: rating }));
    try {
      await chatService.submitFeedback(msgId, rating, "User rating from chat UI");
    } catch (e) {
      console.warn("Feedback error:", e);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 select-none">
      {/* Editorial Header Banner */}
      <div className="bg-white border border-zinc-300 rounded-[24px] p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>GROUNDED STATUTORY RAG</span>
          </div>
          <h1 className="editorial-headline text-2xl sm:text-3xl font-black uppercase tracking-tight text-black leading-none">
            AI REGULATORY ASSISTANT
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 max-w-2xl leading-relaxed">
            Direct statutory retrieval against official Gazette notifications, Quality Control Orders, and Scheme-I certification requirements. Zero hallucination.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-zinc-50 border border-zinc-300 px-3 py-1.5 rounded-xl font-mono text-xs">
            <Globe className="w-3.5 h-3.5 text-black" />
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-transparent text-xs font-mono font-bold text-black focus:outline-none cursor-pointer"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>{l.native} ({l.name})</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setMessages([{
              id: 'reset',
              role: 'assistant',
              content: "Conversation refreshed. How may I assist you with Indian Standards or BIS certification?",
              sources: []
            }])}
            className="p-2 text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-xl border border-zinc-300 transition-colors cursor-pointer"
            title="Clear Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white border border-zinc-300 rounded-[28px] shadow-xs flex flex-col h-[660px] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 ${
                  isUser 
                    ? 'bg-black text-white shadow-xs' 
                    : 'bg-zinc-50/80 text-black border border-zinc-200 shadow-2xs'
                }`}>
                  {/* Assistant Tag & Query Classification */}
                  {!isUser && (
                    <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-zinc-200">
                      <div className="flex items-center space-x-1.5 font-mono">
                        <ShieldCheck className="w-4 h-4 text-black" />
                        <span className="font-bold text-xs uppercase tracking-wider text-black">BIS Official Assistant</span>
                      </div>
                      {msg.query_classification && (
                        <span className="font-mono text-[10px] font-bold uppercase bg-white border border-zinc-300 text-zinc-700 px-2 py-0.5 rounded-full">
                          {msg.query_classification}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Content */}
                  <div className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line font-normal ${isUser ? 'text-zinc-100' : 'text-zinc-800'}`}>
                    {msg.content}
                  </div>

                  {/* Sources & Citations Box */}
                  {!isUser && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-zinc-200">
                      <label className="font-mono text-[11px] font-bold text-zinc-700 uppercase tracking-wider flex items-center space-x-1.5 mb-2">
                        <FileText className="w-3.5 h-3.5 text-black" />
                        <span>Verifiable Clause Citations ({msg.sources.length}):</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((src, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => {
                              setSelectedCitation(src);
                              setDrawerOpen(true);
                            }}
                            className="inline-flex items-center space-x-1.5 bg-white hover:bg-zinc-100 text-black border border-zinc-300 hover:border-black px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            <span className="text-zinc-500 font-extrabold">[{sIdx + 1}]</span>
                            <span>{src.document} — {src.clause}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assistant Footer Controls (TTS + Feedback) */}
                  {!isUser && msg.id !== 'welcome' && (
                    <div className="mt-3 pt-2 flex items-center justify-between text-zinc-400 text-xs border-t border-zinc-100">
                      {/* TTS Speak button */}
                      <button
                        onClick={() => toggleSpeech(msg)}
                        className="inline-flex items-center space-x-1 hover:text-black transition-colors font-mono text-[11px] font-bold uppercase cursor-pointer"
                      >
                        {speakingMessageId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                            <span className="text-red-600">Stop Voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-black" />
                            <span>Listen (TTS)</span>
                          </>
                        )}
                      </button>

                      {/* Thumbs up/down feedback */}
                      <div className="flex items-center space-x-2 font-mono">
                        <span className="text-[10px] text-zinc-400 uppercase">Feedback:</span>
                        <button
                          onClick={() => handleFeedback(msg.id, 1)}
                          className={`p-1 rounded hover:bg-zinc-200 transition-colors cursor-pointer ${feedbackSent[msg.id] === 1 ? 'text-emerald-600' : 'text-zinc-500'}`}
                          title="Accurate and grounded"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleFeedback(msg.id, -1)}
                          className={`p-1 rounded hover:bg-zinc-200 transition-colors cursor-pointer ${feedbackSent[msg.id] === -1 ? 'text-red-600' : 'text-zinc-500'}`}
                          title="Report inaccuracy"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                        {feedbackSent[msg.id] && (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center uppercase">
                            <Check className="w-3 h-3 mr-0.5" /> Logged
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 max-w-sm flex items-center space-x-3 shadow-2xs font-mono">
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
                <span className="text-xs text-zinc-600 font-bold uppercase tracking-wider">Retrieving gazetted BIS clauses...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Carousel */}
        <div className="px-4 py-2.5 bg-zinc-50 border-t border-zinc-200 flex items-center space-x-2 overflow-x-auto">
          <span className="font-mono text-[10px] font-bold text-zinc-400 whitespace-nowrap uppercase tracking-widest">
            TRY PROMPTS:
          </span>
          {suggestedQuestions.map((sq, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(sq.text)}
              className="font-mono text-xs bg-white hover:bg-zinc-100 text-zinc-700 hover:text-black border border-zinc-300 hover:border-black rounded-full px-3 py-1 whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
            >
              {sq.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-white border-t border-zinc-200 flex items-center space-x-2"
        >
          {/* Voice input mic button */}
          <button
            type="button"
            onClick={() => setVoiceModalOpen(true)}
            className="p-2.5 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-xl border border-zinc-300 transition-colors cursor-pointer"
            title="Speak with Bhashini Multilingual Speech"
          >
            <Mic className="w-5 h-5 text-black" />
          </button>

          {/* Input text field */}
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              currentLang === 'hi' 
                ? "यहाँ भारतीय मानक या उत्पाद का नाम लिखें (जैसे: सीमेंट, प्रेशर कुकर, पेयजल)..." 
                : "Ask about any Indian Standard, product requirement, QCO, or certification..."
            }
            className="flex-1 bg-zinc-50 text-black border border-zinc-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white transition-all uppercase tracking-wide"
            disabled={loading}
          />

          {/* Send button */}
          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="bg-black hover:bg-zinc-800 disabled:opacity-40 text-white font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center space-x-1"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">SEND</span>
          </button>
        </form>
      </div>

      {/* Clause Inspection Drawer */}
      <ClauseDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        citation={selectedCitation}
      />

      {/* Voice Recognition Modal */}
      <VoiceModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onTranscript={handleVoiceTranscript}
      />
    </div>
  );
};
