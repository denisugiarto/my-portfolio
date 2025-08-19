import { ContactMessage } from "@/lib/sanity";
import { submitContactMessage } from "@/lib/sanity-queries";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const submitContact = async (
  formData: ContactFormData
): Promise<ContactMessage> => {
  try {
    const contactMessage: Omit<ContactMessage, '_id'> = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    return await submitContactMessage(contactMessage);
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    throw new Error(error.message || "Error submitting contact form");
  }
};