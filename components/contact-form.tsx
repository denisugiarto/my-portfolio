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
      <div className="border-4 border-foreground bg-success p-8 py-12 shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
        <CheckCircle className="mx-auto mb-6 h-24 w-24 stroke-[3] text-success-foreground" />
        <h3 className="mb-6 text-center text-3xl font-black uppercase tracking-tight text-success-foreground md:text-5xl">
          MESSAGE SENT!
        </h3>
        <p className="mx-auto mb-10 max-w-lg border-2 border-foreground bg-background/20 p-4 text-center text-xl font-bold leading-relaxed text-success-foreground">
          THANK YOU FOR REACHING OUT. I&apos;LL GET BACK TO YOU WITHIN 24 HOURS.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={resetForm}
            className="border-4 border-foreground bg-background px-8 py-6 text-xl font-black uppercase text-foreground shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-1 hover:-translate-y-1 hover:bg-background hover:text-foreground hover:shadow-[10px_10px_0px_0px_hsl(var(--foreground))]"
          >
            SEND ANOTHER MESSAGE
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full">
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {errors.general && (
          <div className="border-4 border-foreground bg-destructive p-3 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:p-4">
            <p className="text-base font-black uppercase tracking-wider text-destructive-foreground md:text-lg">
              {errors.general}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-2 text-sm font-black uppercase tracking-widest text-foreground md:mb-3 md:text-base"
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
                "w-full rounded-none border-[3px] bg-background px-3 py-3 text-base font-bold text-foreground transition-none md:border-4 md:px-4 md:py-4 md:text-lg",
                "placeholder:font-bold placeholder:text-muted-foreground",
                "focus:translate-x-1 focus:translate-y-1 focus:outline-none",
                errors.name
                  ? "border-destructive shadow-[4px_4px_0px_0px_hsl(var(--destructive))] focus:shadow-none"
                  : "border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] focus:shadow-none",
              )}
              placeholder="YOUR FULL NAME"
            />
            {errors.name && (
              <div className="mt-3 inline-block border-2 border-foreground bg-destructive px-2 py-1">
                <p className="text-sm font-black uppercase text-destructive-foreground">
                  {errors.name}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-black uppercase tracking-widest text-foreground md:mb-3 md:text-base"
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
                "w-full rounded-none border-[3px] bg-background px-3 py-3 text-base font-bold text-foreground transition-none md:border-4 md:px-4 md:py-4 md:text-lg",
                "placeholder:font-bold placeholder:text-muted-foreground",
                "focus:translate-x-1 focus:translate-y-1 focus:outline-none",
                errors.email
                  ? "border-destructive shadow-[4px_4px_0px_0px_hsl(var(--destructive))] focus:shadow-none"
                  : "border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] focus:shadow-none",
              )}
              placeholder="YOUR@EMAIL.COM"
            />
            {errors.email && (
              <div className="mt-3 inline-block border-2 border-foreground bg-destructive px-2 py-1">
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
            className="mb-2 text-sm font-black uppercase tracking-widest text-foreground md:mb-3 md:text-base"
          >
            YOUR MESSAGE *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className={cn(
              "w-full rounded-none border-[3px] bg-background px-3 py-3 text-base font-bold text-foreground transition-none md:border-4 md:px-4 md:py-4 md:text-lg",
              "resize-y placeholder:font-bold placeholder:text-muted-foreground",
              "focus:translate-x-1 focus:translate-y-1 focus:outline-none",
              errors.message
                ? "border-destructive shadow-[4px_4px_0px_0px_hsl(var(--destructive))] focus:shadow-none"
                : "border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] focus:shadow-none",
            )}
            placeholder="TELL ME ABOUT YOUR PROJECT, QUESTIONS, OR HOW I CAN HELP YOU..."
          />
          {errors.message && (
            <div className="mt-3 inline-block border-2 border-foreground bg-destructive px-2 py-1">
              <p className="text-sm font-black uppercase text-destructive-foreground">
                {errors.message}
              </p>
            </div>
          )}
          <div className="mt-4 inline-block border-2 border-foreground bg-muted px-2 py-1 text-sm font-black uppercase">
            {formData.message.length}/2000 CHARACTERS
          </div>
        </div>

        <div className="flex pt-2 md:justify-end md:pt-4">
          <Button
            type="submit"
            disabled={status === "submitting"}
            size="lg"
            className="w-full"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin stroke-[3]" />
                SENDING...
              </>
            ) : (
              <>
                <Send className="mr-2 h-6 w-6 stroke-[3]" />
                SEND MESSAGE
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
