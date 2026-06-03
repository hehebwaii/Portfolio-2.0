'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: false,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setStatusMessage('');

    // Client-side honeypot check (redundant but safe)
    if (formData.botcheck) {
      setTimeout(() => {
        setStatus('success');
        setStatusMessage('TRANSMISSION SUCCESSFUL. TELEMETRY LOCK ESTABLISHED.');
      }, 1000);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          botcheck: formData.botcheck,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setStatusMessage('TRANSMISSION SUCCESSFUL. TELEMETRY LOCK ESTABLISHED.');
        setFormData({
          name: '',
          email: '',
          message: '',
          botcheck: false,
        });
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'TRANSMISSION ROUTING FAILURE. TRY AGAIN.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('TRANSMISSION SHIELD COLLISION. CONNECTION RESET.');
    }
  };

  return (
    <form 
      suppressHydrationWarning 
      className="card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        backgroundColor: '#000', 
        color: '#fff',
        width: '100%',
        border: 'var(--border-thick)',
        boxShadow: 'var(--shadow-brutal)',
        padding: '2rem'
      }} 
      onSubmit={handleSubmit}
    >
      {/* Honeypot Field */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        checked={formData.botcheck}
        onChange={handleChange}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          suppressHydrationWarning
          type="text"
          name="name"
          placeholder="IDENTIFIER [NAME]"
          required
          value={formData.name}
          onChange={handleChange}
          className="cursor-text-override font-mono"
          style={{
            width: '100%', 
            padding: 'clamp(0.75rem, 1.5vw, 1rem)', 
            border: '3px solid #00FF41',
            backgroundColor: 'transparent', 
            color: '#00FF41', 
            fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)', 
            outline: 'none',
            minHeight: '48px',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          suppressHydrationWarning
          type="email"
          name="email"
          placeholder="ROUTING [EMAIL]"
          required
          value={formData.email}
          onChange={handleChange}
          className="cursor-text-override font-mono"
          style={{
            width: '100%', 
            padding: 'clamp(0.75rem, 1.5vw, 1rem)', 
            border: '3px solid #00FF41',
            backgroundColor: 'transparent', 
            color: '#00FF41', 
            fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)', 
            outline: 'none',
            minHeight: '48px',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <textarea
          suppressHydrationWarning
          name="message"
          placeholder="TRANSMISSION [MESSAGE]"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="cursor-text-override font-mono"
          style={{
            width: '100%', 
            padding: 'clamp(0.75rem, 1.5vw, 1rem)', 
            border: '3px solid #00FF41',
            backgroundColor: 'transparent', 
            color: '#00FF41', 
            fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)', 
            outline: 'none', 
            resize: 'vertical',
          }}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn btn-primary font-mono"
        style={{ 
          width: '100%', 
          fontSize: 'clamp(1rem, 2vw, 1.5rem)', 
          padding: 'clamp(1rem, 2vw, 1.5rem)', 
          backgroundColor: status === 'submitting' ? '#444' : '#00FF41', 
          color: status === 'submitting' ? '#888' : '#000', 
          minHeight: '48px',
          cursor: status === 'submitting' ? 'not-allowed' : 'pointer'
        }}
      >
        {status === 'submitting' ? 'TRANSMITTING...' : 'EXECUTE_TRANSMISSION()'}
      </button>

      {statusMessage && (
        <div 
          className="font-mono" 
          style={{ 
            marginTop: '0.5rem', 
            padding: '1rem', 
            border: `3px solid ${status === 'success' ? '#00FF41' : '#FF3B30'}`, 
            color: status === 'success' ? '#00FF41' : '#FF3B30',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            fontSize: '0.9rem',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {statusMessage}
        </div>
      )}
    </form>
  );
}
