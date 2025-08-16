import { ContactMessage } from "@/lib/sanity";
import { submitContactMessage } from "@/lib/sanity-queries";

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export const submitContact = async (
  formData: ContactFormData,
  request?: any
): Promise<ContactMessage> => {
  try {
    let ipAddress = '';
    let userAgent = '';

    if (request) {
      ipAddress = request.headers.get('x-forwarded-for') || 
                  request.headers.get('x-real-ip') || 
                  'unknown';
      userAgent = request.headers.get('user-agent') || 'unknown';
    }

    const contactMessage: Omit<ContactMessage, '_id'> = {
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'new',
      priority: 'medium',
      ipAddress,
      userAgent,
    };

    return await submitContactMessage(contactMessage);
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    throw new Error(error.message || "Error submitting contact form");
  }
};