'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Send, CheckCircle, AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  general?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
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
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.projectType.trim()) {
      newErrors.projectType = 'Project type is required';
    }

    if (!formData.budget.trim()) {
      newErrors.budget = 'Budget range is required';
    }

    if (!formData.timeline.trim()) {
      newErrors.timeline = 'Timeline is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    // Phone validation (optional field)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s|-|\(|\)/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
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
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
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
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={resetForm}
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{errors.general}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-background text-foreground",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-colors duration-200",
            errors.name ? "border-destructive" : "border-border"
          )}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-background text-foreground",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-colors duration-200",
            errors.email ? "border-destructive" : "border-border"
          )}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
            Company / Organization
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-background text-foreground",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "transition-colors duration-200",
              errors.company ? "border-destructive" : "border-border"
            )}
            placeholder="Your company name"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-destructive">{errors.company}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-background text-foreground",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "transition-colors duration-200",
              errors.phone ? "border-destructive" : "border-border"
            )}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
          Project Type *
        </label>
        <Select
          value={formData.projectType}
          onValueChange={(value) => {
            setFormData(prev => ({ ...prev, projectType: value }));
            if (errors.projectType) {
              setErrors(prev => ({ ...prev, projectType: undefined }));
            }
          }}
        >
          <SelectTrigger
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-background text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "transition-colors duration-200",
              errors.projectType ? "border-destructive" : "border-border"
            )}
          >
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="website">New Website Development</SelectItem>
            <SelectItem value="webapp">Web Application</SelectItem>
            <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
            <SelectItem value="redesign">Website Redesign</SelectItem>
            <SelectItem value="maintenance">Website Maintenance</SelectItem>
            <SelectItem value="mobile">Mobile App Development</SelectItem>
            <SelectItem value="consulting">Technical Consulting</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.projectType && (
          <p className="mt-1 text-sm text-destructive">{errors.projectType}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
            Budget Range *
          </label>
          <Select
            value={formData.budget}
            onValueChange={(value) => {
              setFormData(prev => ({ ...prev, budget: value }));
              if (errors.budget) {
                setErrors(prev => ({ ...prev, budget: undefined }));
              }
            }}
          >
            <SelectTrigger
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-background text-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                "transition-colors duration-200",
                errors.budget ? "border-destructive" : "border-border"
              )}
            >
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-5k">Under $5,000</SelectItem>
              <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
              <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
              <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
              <SelectItem value="over-100k">Over $100,000</SelectItem>
              <SelectItem value="discuss">Let&apos;s discuss</SelectItem>
            </SelectContent>
          </Select>
          {errors.budget && (
            <p className="mt-1 text-sm text-destructive">{errors.budget}</p>
          )}
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-foreground mb-2">
            Timeline *
          </label>
          <Select
            value={formData.timeline}
            onValueChange={(value) => {
              setFormData(prev => ({ ...prev, timeline: value }));
              if (errors.timeline) {
                setErrors(prev => ({ ...prev, timeline: undefined }));
              }
            }}
          >
            <SelectTrigger
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-background text-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                "transition-colors duration-200",
                errors.timeline ? "border-destructive" : "border-border"
              )}
            >
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">ASAP (Rush job)</SelectItem>
              <SelectItem value="1-month">Within 1 month</SelectItem>
              <SelectItem value="2-3-months">2-3 months</SelectItem>
              <SelectItem value="3-6-months">3-6 months</SelectItem>
              <SelectItem value="6-months-plus">6+ months</SelectItem>
              <SelectItem value="flexible">Flexible timeline</SelectItem>
            </SelectContent>
          </Select>
          {errors.timeline && (
            <p className="mt-1 text-sm text-destructive">{errors.timeline}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Project Description *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleInputChange}
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-background text-foreground",
            "placeholder:text-muted-foreground resize-vertical",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-colors duration-200",
            errors.message ? "border-destructive" : "border-border"
          )}
          placeholder="Please describe your project goals, requirements, and any specific features you need. Include any design preferences, technical requirements, or questions you have."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">{errors.message}</p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          Minimum 10 characters required
        </p>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-6 py-3",
          "bg-primary text-primary-foreground rounded-lg font-medium",
          "hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}