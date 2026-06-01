import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '../.env');

let envFileContent = '';
try {
  envFileContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
  console.log('Error reading .env file:', e.message);
}

// Find VITE_GEMINI_API_KEY
const match = envFileContent.match(/VITE_GEMINI_API_KEY\s*=\s*([^\s]+)/);
const GEMINI_API_KEY = match ? match[1] : null;

const MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemma-4-31b-it',
  'gemma-4-26b-it',
  'gemini-flash-latest',
];

const SYSTEM_PROMPT = "You are a warm, refined digital concierge at Sharrow Bay Hotel. Your goal is to help guests by responding directly in 2 to 4 elegant sentences. You do not have real-time room availability, so for any booking queries, please invite them to contact us via email at [info@sharrowbay.co.uk](mailto:info@sharrowbay.co.uk) or call +44 17684 86301. For directions, provide the link [Google Maps Directions to Sharrow Bay Hotel](https://www.google.com/maps/dir/?api=1&destination=Sharrow+Bay+Hotel,+Ullswater,+Penrith,+Cumbria+CA10+2LZ). If referencing our website, use [sharrowbay.co.uk](https://sharrowbay.co.uk). You must write only the direct friendly response itself, and never output any draft options, reasoning, or constraints lists.";

const geminiUrl = (model) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

async function test() {
  console.log('Using API Key:', GEMINI_API_KEY ? `${GEMINI_API_KEY.substring(0, 10)}...` : 'None');
  
  if (!GEMINI_API_KEY) {
    console.log('No API key found!');
    return;
  }

  const body = JSON.stringify({
    contents: [
      { role: 'user', parts: [{ text: 'Are rooms available now?' }] }
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    generationConfig: { temperature: 0.7, maxOutputTokens: 256 },
  });

  for (const model of MODELS) {
    try {
      console.log(`\nTesting model: ${model}...`);
      const res = await fetch(geminiUrl(model), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      console.log(`Status: ${res.status}`);
      const data = await res.json();
      if (!res.ok) {
        console.log('Error:', data?.error?.message || data);
        continue;
      }

      console.log('Response text:', data?.candidates?.[0]?.content?.parts?.[0]?.text);
      break;
    } catch (e) {
      console.log('Fetch error:', e.message);
    }
  }
}

test();
