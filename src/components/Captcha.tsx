import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export function Captcha({ onVerify }: CaptchaProps) {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    onVerify(userInput.toUpperCase() === captchaText.toUpperCase());
  }, [userInput, captchaText, onVerify]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Captcha Verification
      </label>
      <div className="flex gap-2 mb-2">
        <div className="flex-1 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-3 text-center font-mono text-lg font-bold text-gray-700 select-none">
          {captchaText}
        </div>
        <button
          type="button"
          onClick={generateCaptcha}
          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 hover:text-gray-800"
          title="Refresh captcha"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500 uppercase"
        placeholder="Enter the captcha text (case insensitive)"
        style={{ textTransform: 'uppercase' }}
        required
      />
    </div>
  );
}