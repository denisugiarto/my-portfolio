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
      <div className="py-12 border-4 border-foreground bg-success p-8 shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
        <CheckCircle className="mb-6 h-24 w-24 text-success-foreground stroke-[3] mx-auto" />
        <h3 className="mb-6 text-3xl md:text-5xl font-black uppercase tracking-tight text-success-foreground text-center">
          MESSAGE SENT!
        </h3>
        <p className="mb-10 text-xl font-bold leading-relaxed text-success-foreground text-center max-w-lg mx-auto bg-background/20 p-4 border-2 border-foreground">
          THANK YOU FOR REACHING OUT. I'LL GET BACK TO YOU WITHIN 24 HOURS.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={resetForm}
            className="border-4 border-foreground bg-background text-foreground px-8 py-6 text-xl font-black uppercase shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-1 hover:-translate-y-1 hover:bg-background hover:text-foreground hover:shadow-[10px_10px_0px_0px_hsl(var(--foreground))]"
          >
            SEND ANOTHER MESSAGE
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full">
      <form onSubmit={handleSubmit} className="space-y-8">
        {errors.general && (
          <div className="border-4 border-foreground bg-destructive p-4 shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
            <p className="text-lg font-black uppercase tracking-wider text-destructive-foreground">
              {errors.general}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-3 text-lg font-black uppercase tracking-widest text-foreground"
            >
              FULL NAME *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="name"
              className={cn(
                "w-full rounded-none border-4 bg-background px-4 py-4 text-lg font-bold text-foreground transition-none",
                "placeholder:text-muted-foreground placeholder:font-bold",
                "focus:outline-none focus:translate-x-1 focus:translate-y-1",
                errors.name
                  ? "border-destructive focus:shadow-none shadow-[4px_4px_0px_0px_hsl(var(--destructive))]"
                  : "border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] focus:shadow-none hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]",
              )}
              placeholder="YOUR FULL NAME"
            />
            {errors.name && (
              <div className="mt-3 inline-block bg-destructive px-2 py-1 border-2 border-foreground">
                <p className="text-sm font-black uppercase text-destructive-foreground">
                  {errors.name}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-3 text-lg font-black uppercase tracking-widest text-foreground"
            >
              EMAIL ADDRESS *
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
                "w-full rounded-none border-4 bg-background px-4 py-4 text-lg font-bold text-foreground transition-none",
                "placeholder:text-muted-foreground placeholder:font-bold",
                "focus:outline-none focus:translate-x-1 focus:translate-y-1",
                errors.email
                  ? "border-destructive focus:shadow-none shadow-[4px_4px_0px_0px_hsl(var(--destructive))]"
                  : "border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] focus:shadow-none hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]",
              )}
              placeholder="YOUR@EMAIL.COM"
            />
            {errors.email && (
              <div className="mt-3 inline-block bg-destructive px-2 py-1 border-2 border-foreground">
                <p className="text-sm font-black uppercase text-destructive-foreground">
                  {errors.email}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="message"
            className="mb-3 text-lg font-black uppercase tracking-widest text-foreground"
          >
            YOUR MESSAGE *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            className={cn(
              "w-full rounded-none border-4 bg-background px-4 py-4 text-lg font-bold text-foreground transition-none",
              "resize-y placeholder:text-muted-foreground placeholder:font-bold",
              "focus:outline-none focus:translate-x-1 focus:translate-y-1",
              errors.message
                ? "border-destructive focus:shadow-none shadow-[4px_4px_0px_0px_hsl(var(--destructive))]"
                : "border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] focus:shadow-none hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]",
            )}
            placeholder="TELL ME ABOUT YOUR PROJECT, QUESTIONS, OR HOW I CAN HELP YOU..."
          />
          {errors.message && (
            <div className="mt-3 inline-block bg-destructive px-2 py-1 border-2 border-foreground">
              <p className="text-sm font-black uppercase text-destructive-foreground">
                {errors.message}
              </p>
            </div>
          )}
          <div className="mt-4 inline-block border-2 border-foreground bg-muted px-2 py-1 text-sm font-black uppercase">
            {formData.message.length}/2000 CHARACTERS
          </div>
        </div>

        <div className="flex md:justify-end pt-4">
          <Button
            type="submit"
            disabled={status === "submitting"}
            size="lg"
            className="w-full flex h-16 items-center justify-center gap-3 border-4 border-foreground bg-primary px-8 text-xl font-black uppercase tracking-widest text-primary-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_hsl(var(--foreground))] disabled:opacity-100 disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none disabled:translate-x-1 disabled:translate-y-1 md:w-auto"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin stroke-[3]" />
                SENDING...
              </>
            ) : (
              <>
                <Send className="h-6 w-6 stroke-[3]" />
                SEND MESSAGE
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
