import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VoiceModal = ({ isOpen, onClose, onTranscript }) => {
  const { currentLang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');

  // Sample quick questions for testing voice in both Hindi and English
  const quickVoicePrompts = [
    { text: "प्रेशर कुकर पर कौन सा मानक लागू होता है?", lang: "hi", label: "प्रेशर कुकर मानक (Hindi)" },
    { text: "What is the BIS standard applicable to cement?", lang: "en", label: "Cement Standard (English)" },
    { text: "What is the requirement for packaged drinking water?", lang: "en", label: "Packaged Water (English)" },
    { text: "स्वर्ण आभूषण के HUID को कैसे सत्यापित करें?", lang: "hi", label: "HUID सत्यापन (Hindi)" }
  ];

  useEffect(() => {
    let recognition = null;
    if (isOpen && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = currentLang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInterimText(transcript);
        if (event.results[0].isFinal) {
          setIsListening(false);
          onTranscript(transcript);
          onClose();
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      try {
        recognition.start();
      } catch (err) {
        console.warn("Speech recognition already running or not supported:", err);
      }
    }

    return () => {
      if (recognition) {
        try { recognition.stop(); } catch (e) {}
      }
    };
  }, [isOpen, currentLang]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center relative animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Pulsing Mic Circle */}
        <div className="relative mx-auto my-6 w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75"></div>
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-gov-navy to-gov-blue flex items-center justify-center text-white shadow-lg">
            <Mic className="w-10 h-10 animate-pulse text-amber-400" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900">
          {currentLang === 'hi' ? 'बोलिए, हम सुन रहे हैं...' : 'Listening in Bhashini Mode...'}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {currentLang === 'hi' ? 'हिन्दी में अपना प्रश्न पूछें (जैसे: प्रेशर कुकर का मानक)' : 'Speak your question in English or Indian languages'}
        </p>

        {/* Transcription Display */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 min-h-[50px] flex items-center justify-center text-slate-800 text-sm font-medium">
          {interimText || (currentLang === 'hi' ? 'आवाज़ रिकॉर्ड की जा रही है...' : 'Listening for audio stream...')}
        </div>

        {/* Quick Voice Demo Presets */}
        <div className="mt-6 text-left border-t border-slate-100 pt-4">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Or Click a Voice Sample to Ask:
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {quickVoicePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onTranscript(p.text);
                  onClose();
                }}
                className="text-left text-xs bg-slate-50 hover:bg-blue-50 hover:text-gov-blue p-2 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors flex items-center justify-between"
              >
                <span className="truncate">{p.label}</span>
                <Volume2 className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
