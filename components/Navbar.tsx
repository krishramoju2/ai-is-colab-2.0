
'use client';
import React, { useEffect, useState } from 'react';

const FONT_OPTIONS = [
  { name: 'Roboto (Default)', className: 'font-roboto' },
  { name: 'Dancing Script', className: 'font-dancing' },
  { name: 'Great Vibes', className: 'font-vibes' },
  { name: 'Satisfy', className: 'font-satisfy' },
  { name: 'Pacifico', className: 'font-pacifico' },
  { name: 'Lobster', className: 'font-lobster' },
  { name: 'Sacramento', className: 'font-sacramento' },
  { name: 'Shadows Into Light', className: 'font-shadows' },
  { name: 'Calligraffitti', className: 'font-calligraffitti' }
];

export default function Navbar({ user }: { user: { name: string } }) {
  const [selectedFont, setSelectedFont] = useState('font-roboto');

  useEffect(() => {
    const storedFont = localStorage.getItem('font') || 'font-roboto';
    setSelectedFont(storedFont);
    document.body.className = document.body.className.replace(/font-\S+/g, '').trim() + ` ${storedFont}`;
  }, []);

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const font = e.target.value;
    setSelectedFont(font);
    localStorage.setItem('font', font);
    document.body.className = document.body.className.replace(/font-\S+/g, '').trim() + ` ${font}`;
  };

  return (
    <nav className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold text-cyan-400">🤖 GPT Bot Terminal</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">Logged in as: <span className="text-white">{user.name}</span></span>
        <select
          value={selectedFont}
          onChange={handleFontChange}
          className="bg-gray-700 text-white p-1 rounded"
        >
          {FONT_OPTIONS.map((opt) => (
            <option key={opt.className} value={opt.className}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
