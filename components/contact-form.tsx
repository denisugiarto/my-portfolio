'use client';

import { useState } from 'react';
import { ContactFormData } from '@/services/contact';
import { cn } from '@/lib/utils';
import { Loader2, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error: any) {
      setStatus('error');
      setErrors({ general: error.message || 'Failed to send message. Please try again.' });
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrors({});
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-foreground mb-4">Message Sent Successfully!</h3>
        <p className="text-muted-foreground mb-8 text-lg">
          Thank you for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={resetForm}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive font-medium">{errors.general}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="name"
              className={cn(
                "w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                "transition-all duration-200",
                errors.name ? "border-destructive" : "border-border hover:border-primary/50"
              )}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-destructive font-medium">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              inputMode="email"
              autoComplete="email"
              className={cn(
                "w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                "transition-all duration-200",
                errors.email ? "border-destructive" : "border-border hover:border-primary/50"
              )}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-destructive font-medium">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            className={cn(
              "w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground",
              "placeholder:text-muted-foreground resize-vertical",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
              "transition-all duration-200",
              errors.message ? "border-destructive" : "border-border hover:border-primary/50"
            )}
            placeholder="Tell me about your project, questions, or how I can help you..."
          />
          {errors.message && (
            <p className="mt-2 text-sm text-destructive font-medium">{errors.message}</p>
          )}
          <div className="mt-2 text-xs text-muted-foreground">
            {formData.message.length}/2000 characters
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Button
            type="submit"
            disabled={status === 'submitting'}
            className='gap-2'
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          * Required fields | I typically respond within 24 hours
        </p>
      </form>
    </div>
  );
}