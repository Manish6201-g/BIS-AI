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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold text-gov-navy">BISmart Intelligent Assistant</h1>
            <span className="bg-blue-100 text-gov-blue text-[11px] font-bold px-2 py-0.5 rounded-full">
              Grounded RAG Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Strict anti-hallucination enforcement • Verifiable clause citations from gazetted standards
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
            <Globe className="w-3.5 h-3.5 text-gov-blue" />
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
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
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200"
            title="Clear Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col h-[650px] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 ${
                  isUser 
                    ? 'bg-gov-blue text-white shadow-sm' 
                    : 'bg-slate-50 text-slate-900 border border-slate-200 shadow-xs'
                }`}>
                  {/* Assistant Tag & Query Classification */}
                  {!isUser && (
                    <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-200/80">
                      <div className="flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-gov-blue" />
                        <span className="font-bold text-xs text-gov-navy">BIS Official Assistant</span>
                      </div>
                      {msg.query_classification && (
                        <span className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                          {msg.query_classification}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Content */}
                  <div className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line ${isUser ? 'text-white' : 'text-slate-800'}`}>
                    {msg.content}
                  </div>

                  {/* Sources & Citations Box */}
                  {!isUser && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200/80">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1 mb-2">
                        <FileText className="w-3.5 h-3.5 text-gov-blue" />
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
                            className="inline-flex items-center space-x-1.5 bg-white hover:bg-blue-50 text-gov-blue border border-blue-200 hover:border-blue-400 px-2.5 py-1 rounded-lg text-xs font-bold transition-all shadow-xs"
                          >
                            <span className="text-amber-600 font-extrabold">[{sIdx + 1}]</span>
                            <span>{src.document} — {src.clause}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assistant Footer Controls (TTS + Feedback) */}
                  {!isUser && msg.id !== 'welcome' && (
                    <div className="mt-3 pt-2 flex items-center justify-between text-slate-400 text-xs">
                      {/* TTS Speak button */}
                      <button
                        onClick={() => toggleSpeech(msg)}
                        className="inline-flex items-center space-x-1 hover:text-gov-blue transition-colors text-[11px] font-medium"
                      >
                        {speakingMessageId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                            <span className="text-red-500">Stop Voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen (TTS)</span>
                          </>
                        )}
                      </button>

                      {/* Thumbs up/down feedback */}
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-slate-400">Helpful?</span>
                        <button
                          onClick={() => handleFeedback(msg.id, 1)}
                          className={`p-1 rounded hover:bg-slate-200 transition-colors ${feedbackSent[msg.id] === 1 ? 'text-emerald-600' : ''}`}
                          title="Accurate and grounded"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleFeedback(msg.id, -1)}
                          className={`p-1 rounded hover:bg-slate-200 transition-colors ${feedbackSent[msg.id] === -1 ? 'text-red-500' : ''}`}
                          title="Report inaccuracy"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                        {feedbackSent[msg.id] && (
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center">
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
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full border-2 border-gov-blue border-t-transparent animate-spin"></div>
                <span className="text-xs text-slate-600 font-medium">Retrieving verified BIS clauses & standard codes...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Carousel */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center space-x-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap uppercase tracking-wider">Try:</span>
          {suggestedQuestions.map((sq, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(sq.text)}
              className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-gov-blue border border-slate-200 hover:border-blue-300 rounded-full px-3 py-1 whitespace-nowrap transition-colors shadow-xs"
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
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center space-x-2"
        >
          {/* Voice input mic button */}
          <button
            type="button"
            onClick={() => setVoiceModalOpen(true)}
            className="p-2.5 text-slate-600 hover:text-gov-blue hover:bg-blue-50 rounded-xl border border-slate-200 transition-colors"
            title="Speak with Bhashini Multilingual Speech"
          >
            <Mic className="w-5 h-5 text-amber-600" />
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
            className="flex-1 bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all"
            disabled={loading}
          />

          {/* Send button */}
          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="bg-gov-blue hover:bg-blue-900 disabled:opacity-50 text-white font-semibold p-2.5 rounded-xl transition-colors shadow-xs"
          >
            <Send className="w-5 h-5" />
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
