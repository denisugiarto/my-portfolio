"use client";

import { useState } from "react";
import { ContactFormData } from "@/services/contact";
import { cn } from "@/lib/utils";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { sendGAEvent } from "@next/third-parties/google";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      sendGAEvent("event", "Contact Form", {
        event_category: "Form Submission",
        event_label: "Contact",
        event_action: "Contact Form",
        event_value: "Submit",
      });
    } catch (error: any) {
      setStatus("error");
      setErrors({
        general: error.message || "Failed to send message. Please try again.",
      });
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrors({});
  };

  if (status === "success") {
    return (
      <div className="py-12 text-center">
        <CheckCircle className="mx-auto mb-6 h-20 w-20 text-green-500" />
        <h3 className="mb-4 text-2xl font-bold text-foreground">
          Message Sent Successfully!
        </h3>
        <p className="mb-8 text-lg text-muted-foreground">
          Thank you for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={resetForm}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
            <p className="text-sm font-medium text-destructive">
              {errors.general}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
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
                "w-full rounded-lg border-2 bg-background px-4 py-3 text-foreground",
                "placeholder:text-muted-foreground",
                "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary",
                "transition-all duration-200",
                errors.name
                  ? "border-destructive"
                  : "border-border hover:border-primary/50",
              )}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="mt-2 text-sm font-medium text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
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
                "w-full rounded-lg border-2 bg-background px-4 py-3 text-foreground",
                "placeholder:text-muted-foreground",
                "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary",
                "transition-all duration-200",
                errors.email
                  ? "border-destructive"
                  : "border-border hover:border-primary/50",
              )}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm font-medium text-destructive">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            className={cn(
              "w-full rounded-lg border-2 bg-background px-4 py-3 text-foreground",
              "resize-vertical placeholder:text-muted-foreground",
              "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary",
              "transition-all duration-200",
              errors.message
                ? "border-destructive"
                : "border-border hover:border-primary/50",
            )}
            placeholder="Tell me about your project, questions, or how I can help you..."
          />
          {errors.message && (
            <p className="mt-2 text-sm font-medium text-destructive">
              {errors.message}
            </p>
          )}
          <div className="mt-2 text-xs text-muted-foreground">
            {formData.message.length}/2000 characters
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-full gap-2 md:w-auto"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send Message
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          * Required fields | I typically respond within 24 hours
        </p>
      </form>
    </div>
  );
}
