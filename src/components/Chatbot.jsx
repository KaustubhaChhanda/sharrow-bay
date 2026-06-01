import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Trash2, Loader2, BotMessageSquare, MapPin } from 'lucide-react';

// ─────────────────────────────────────────────
// Gemini API — credentials from .env
// Tries models in priority order until one works
// ─────────────────────────────────────────────
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Model priority list — first available wins
const MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-flash-latest',
];

const geminiUrl = (model) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

// ─────────────────────────────────────────────
// Hotel concierge system prompt
// ─────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a warm, refined, and elegant digital concierge at Sharrow Bay Hotel and Lakeside Restaurant — England's first country house hotel, established in 1948 on the shores of Ullswater in the Lake District, Cumbria.

Help guests with detailed and accurate information using the following official details:
- Website: [sharrowbay.co.uk](https://sharrowbay.co.uk)
- Email: [info@sharrowbay.co.uk](mailto:info@sharrowbay.co.uk)
- Phone/Contact: +44 17684 86301
- Location: Ullswater, Penrith, Cumbria, CA10 2LZ, United Kingdom. Direct guests to our location using this Google Maps directions link: [Google Maps Directions to Sharrow Bay Hotel](https://www.google.com/maps/dir/?api=1&destination=Sharrow+Bay+Hotel,+Ullswater,+Penrith,+Cumbria+CA10+2LZ)
- Social Media: Invite guests to follow us on Facebook at [Facebook](https://www.facebook.com/sharrowbayhotel) (with over 3.5K followers) and Instagram at [Instagram](https://instagram.com/sharrowbayhotel).
- History & Heritage: Established in 1948 by Francis Coulson and Brian Sack. Sharrow Bay is the first country house hotel in England, famed for classic British hospitality, luxury, and for inventing the iconic Sticky Toffee Pudding.
- Rooms & Suites: Check-in 3 PM, check-out 11 AM. Includes breakfast. Suites include The Ullswater Suite, The Damask Canopy Room, The Heritage Damask Room, and The Edwardian Sitting Suite.
- Dining & Afternoon Tea: AA Rosette lakeside restaurant with panoramic lake views, fine dining, award-winning cuisine, local Cumbrian produce, and traditional Afternoon Tea served daily on fine bone china.
- Events & Occasions: Weddings, milestone dinners, corporate retreats, and exclusive dining room hire.
- AI & Technology (Cogniq partnership): We are proud to feature digital concierge services, automated guest communication, and modern tech enhancements built in partnership with Cogniq.

Guidelines for response:
1. Always respond in an elegant, warm, and highly professional concierge tone.
2. Limit responses to 2-4 sentences for readability, but be helpful and complete.
3. Whenever referencing the website, email, directions, or socials, ALWAYS use the exact Markdown links provided above so that they render as clickable elements (e.g. [sharrowbay.co.uk](https://sharrowbay.co.uk)).
4. For reservation bookings or real-time availability, invite guests to email us at [info@sharrowbay.co.uk](mailto:info@sharrowbay.co.uk) or call +44 17684 86301.`;

// ─────────────────────────────────────────────
// Quick prompt chips
// ─────────────────────────────────────────────
const QUICK_PROMPTS = [
  'Are rooms available now?',
  'Tell me about dining',
  'What is afternoon tea like?',
  'Can you host a private event?',
  'Where are you located?',
  'Who made Sticky Toffee Pudding?',
];

// ─────────────────────────────────────────────
// Gemini API call — tries each model until one succeeds
// ─────────────────────────────────────────────
async function callGemini(history) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error('API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Of course — I am delighted to assist you today.' }] },
    ...history.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    })),
  ];

  const body = JSON.stringify({
    contents,
    generationConfig: { temperature: 0.7, maxOutputTokens: 256 },
  });

  let lastError = null;

  for (const model of MODELS) {
    try {
      const res = await fetch(geminiUrl(model), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.error?.message || `HTTP ${res.status}`;
        // If "not found" or "not supported", try next model
        if (res.status === 404 || msg.toLowerCase().includes('not found') || msg.toLowerCase().includes('not supported')) {
          lastError = new Error(`${model}: ${msg}`);
          continue;
        }
        throw new Error(msg);
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response from Gemini.');
      return text.trim();

    } catch (e) {
      // Only continue if it's a model-not-found type error
      if (e.message?.toLowerCase().includes('not found') || e.message?.toLowerCase().includes('not supported')) {
        lastError = e;
        continue;
      }
      throw e;
    }
  }

  throw lastError || new Error('No available Gemini model found for this API key.');
}

// ─────────────────────────────────────────────
// Inline style helpers — override global border-radius: 0 !important
// Inline styles have higher specificity than CSS rules in this context
// ─────────────────────────────────────────────
const CIRCLE = { borderRadius: '50%' };
const PILL   = { borderRadius: '999px' };
const SOFT   = { borderRadius: '12px' };
const SOFT_T = { borderRadius: '12px 12px 0 0' };
const SOFT_B = { borderRadius: '0 0 12px 12px' };
const SOFT_MSG_USER = { borderRadius: '14px 4px 14px 14px' };
const SOFT_MSG_BOT  = { borderRadius: '4px 14px 14px 14px' };

// ─────────────────────────────────────────────
// Format raw text (auto-link URLs, Emails, and Phone Numbers)
// ─────────────────────────────────────────────
function processRawText(rawText) {
  if (!rawText) return [];
  const parts = [];
  
  // Matches standard URLs (http/https), www URLs, and raw domains like sharrowbay.co.uk or instagram.com/...
  // Also matches email addresses and UK phone numbers like +44 17684 86301
  const tokenRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|(?:[a-zA-Z0-9-]+\.)+(?:com|co\.uk|org|net)(?:\/[^\s]*)?|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+44\s?\d{4,5}\s?\d{5,6})/g;
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(rawText)) !== null) {
    const value = match[0];
    const matchIndex = match.index;

    // Add text before the match
    if (matchIndex > lastIndex) {
      parts.push(rawText.substring(lastIndex, matchIndex));
    }

    // Determine type of token
    if (value.includes('@')) {
      // Email link
      parts.push(
        <a
          key={`email-${matchIndex}`}
          href={`mailto:${value}`}
          className="font-sans font-bold text-gold hover:text-forest underline transition-colors duration-200"
          style={{ fontSize: '14.5px' }}
        >
          {value}
        </a>
      );
    } else if (value.startsWith('+44')) {
      // Phone number link
      const cleanPhone = value.replace(/\s+/g, '');
      parts.push(
        <a
          key={`phone-${matchIndex}`}
          href={`tel:${cleanPhone}`}
          className="font-sans font-bold text-gold hover:text-forest underline transition-colors duration-200"
          style={{ fontSize: '14.5px' }}
        >
          {value}
        </a>
      );
    } else {
      // URL or raw domain name
      let href = value;
      if (!/^https?:\/\//i.test(href)) {
        href = 'https://' + href;
      }

      const isDirections = value.includes('google.com/maps') || value.includes('maps.google.com') || value.toLowerCase().includes('maps');

      if (isDirections) {
        parts.push(
          <span key={`raw-dir-${matchIndex}`} className="block my-2.5">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-forest hover:bg-gold border border-gold text-gold hover:text-cream font-sans font-bold tracking-wider text-[11px] uppercase py-2.5 px-4 transition-all duration-300 shadow-sm hover:shadow-md w-full text-center cursor-pointer"
              style={{ borderRadius: '8px', textDecoration: 'none' }}
            >
              <MapPin size={14} />
              Google Maps Directions
            </a>
          </span>
        );
      } else {
        parts.push(
          <a
            key={`raw-lnk-${matchIndex}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-bold text-gold hover:text-forest underline transition-colors duration-200"
            style={{ fontSize: '14.5px' }}
          >
            {value}
          </a>
        );
      }
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < rawText.length) {
    parts.push(rawText.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [rawText];
}

// ─────────────────────────────────────────────
// Format message text with markdown link support
// ─────────────────────────────────────────────
function formatMessageText(text) {
  if (typeof text !== 'string') return text;

  // Regex to match markdown links: [Link Text](URL) where protocol is optional
  const regex = /\[([^\]]+)\]\(((?:https?:\/\/|www\.)?[^\s)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, linkText, url] = match;
    const matchIndex = match.index;

    // Add text before the match
    if (matchIndex > lastIndex) {
      parts.push(...processRawText(text.substring(lastIndex, matchIndex)));
    }

    let href = url;
    if (!/^https?:\/\//i.test(href)) {
      href = 'https://' + href;
    }

    const isDirections = url.includes('google.com/maps') || url.includes('maps.google.com') || url.toLowerCase().includes('maps');

    if (isDirections) {
      parts.push(
        <span key={`dir-${matchIndex}`} className="block my-2.5">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-forest hover:bg-gold border border-gold text-gold hover:text-cream font-sans font-bold tracking-wider text-[11px] uppercase py-2.5 px-4 transition-all duration-300 shadow-sm hover:shadow-md w-full text-center cursor-pointer"
            style={{ borderRadius: '8px', textDecoration: 'none' }}
          >
            <MapPin size={14} />
            {linkText}
          </a>
        </span>
      );
    } else {
      parts.push(
        <a
          key={`lnk-${matchIndex}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans font-bold text-gold hover:text-forest underline transition-colors duration-200"
          style={{ fontSize: '14.5px' }}
        >
          {linkText}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(...processRawText(text.substring(lastIndex)));
  }

  return parts.length > 0 ? parts : text;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  const sendMessage = async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || loading) return;

    const userMsg   = { role: 'user', text: trimmed };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const reply = await callGemini(newHistory);
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => { setMessages([]); setError(''); setInput(''); };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* ── Floating Toggle Button — circular with inline style override ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close concierge chat' : 'Open concierge chat'}
        style={CIRCLE}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-forest border-2 border-gold/70 text-gold flex items-center justify-center shadow-2xl hover:bg-gold hover:text-cream transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={20} strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span key="chat"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageCircle size={20} strokeWidth={1.8} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-50 w-auto sm:w-[350px] flex flex-col shadow-2xl border border-gold/35 overflow-hidden"
            style={{ borderRadius: 12, maxHeight: 'calc(100vh - 120px)', height: '480px' }}
          >
            {/* ── Header ── */}
            <div style={SOFT_T} className="bg-forest flex items-center justify-between px-4 py-3 border-b border-gold/25 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                {/* Circular avatar icon */}
                <div
                  style={CIRCLE}
                  className="w-8 h-8 bg-gold/20 border border-gold/50 flex items-center justify-center flex-shrink-0"
                >
                  <BotMessageSquare size={15} strokeWidth={1.5} className="text-gold" />
                </div>
                <div>
                  <p className="text-[11px] font-sans font-bold tracking-[0.2em] text-cream uppercase leading-tight">
                    Sharrow Bay
                  </p>
                  <p className="text-[9px] font-sans font-medium tracking-[0.12em] text-gold/80 uppercase">
                    Digital Concierge
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Clear button — only appears when there are messages */}
                <AnimatePresence>
                  {hasMessages && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={clearChat}
                      style={PILL}
                      className="flex items-center gap-1 text-[9px] font-sans font-bold tracking-wider text-cream/50 hover:text-gold border border-cream/15 hover:border-gold/50 px-2.5 py-1 transition-colors duration-200"
                      aria-label="Clear chat"
                    >
                      <Trash2 size={10} strokeWidth={2} /> Clear
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto bg-[#F7F3EC] px-4 py-4 space-y-3 min-h-[160px]">

              {/* Welcome */}
              {!hasMessages && (
                <div className="flex flex-col items-center text-center py-3">
                  <div style={CIRCLE} className="w-11 h-11 bg-gold/10 border border-gold/30 flex items-center justify-center mb-3">
                    <BotMessageSquare size={20} strokeWidth={1.3} className="text-gold" />
                  </div>
                  <p className="font-sans text-[15px] italic text-forest/75 leading-relaxed">
                    Good day. How may I assist you?
                  </p>
                </div>
              )}

              {/* Bubbles */}
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    style={{
                      ...(msg.role === 'user' ? SOFT_MSG_USER : SOFT_MSG_BOT),
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      whiteSpace: 'pre-wrap',
                    }}
                    className={`max-w-[85%] px-4 py-3 text-[15px] leading-relaxed font-sans font-medium ${
                      msg.role === 'user'
                        ? 'bg-forest text-cream'
                        : 'bg-white text-forest border border-gold/20'
                    }`}
                  >
                    {formatMessageText(msg.text)}
                  </div>
                </motion.div>
              ))}

              {/* Loading dots */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div style={SOFT_MSG_BOT} className="bg-white border border-gold/20 px-4 py-2.5 flex items-center gap-1.5">
                    {[0,1,2].map((i) => (
                      <motion.span key={i} className="w-1.5 h-1.5 bg-gold/70 block"
                        style={{ borderRadius: '50%' }}
                        animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ borderRadius: 8 }}
                  className="bg-red-50 border border-red-200 px-3 py-2 text-[11px] font-sans text-red-600 leading-relaxed"
                >
                  ⚠ {error}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Quick prompts — visible before first message ── */}
            {!hasMessages && (
              <div className="bg-[#F7F3EC] border-t border-gold/15 px-4 py-3 flex-shrink-0">
                <p className="text-[8px] font-sans font-bold tracking-[0.2em] text-forest/35 uppercase mb-2">
                  Suggested
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => sendMessage(p)}
                      style={PILL}
                      className="text-[11px] font-sans font-semibold tracking-wide text-gold border border-gold/40 px-3 py-1.5 hover:bg-gold hover:text-cream transition-colors duration-200 leading-tight"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Input bar ── */}
            <div style={SOFT_B} className="bg-cream border-t border-gold/25 px-3 py-2.5 flex gap-2 items-end flex-shrink-0">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything…"
                rows={1}
                disabled={loading}
                style={{ borderRadius: 8, minHeight: 38, maxHeight: 90, resize: 'none' }}
                className="flex-1 bg-white border border-gold/30 px-3 py-2 text-[14.5px] font-sans text-forest placeholder:text-forest/30 outline-none focus:border-gold transition-colors duration-200 disabled:opacity-50"
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 90) + 'px';
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                aria-label="Send"
                style={CIRCLE}
                className="w-9 h-9 bg-gold text-cream flex items-center justify-center flex-shrink-0 hover:bg-forest transition-colors duration-250 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                {loading
                  ? <Loader2 size={15} className="animate-spin" />
                  : <Send size={15} strokeWidth={2} />
                }
              </button>
            </div>

            {/* Powered-by */}
            <div className="bg-cream px-4 pb-2 text-center flex-shrink-0">
              <p className="text-[7.5px] font-sans tracking-[0.12em] text-forest/20 uppercase">
                Powered by Gemini AI · Not real-time availability
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
