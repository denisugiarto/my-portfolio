import { NextRequest, NextResponse } from 'next/server'
import { submitContact, ContactFormData } from '@/services/contact'

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(request: NextRequest): string {
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown'
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore.get(key)
  
  if (!limit || now > limit.resetTime) {
    // Reset every hour, allow 5 submissions
    rateLimitStore.set(key, { count: 1, resetTime: now + 60 * 60 * 1000 })
    return true
  }
  
  if (limit.count >= 5) {
    return false
  }
  
  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientKey = getRateLimitKey(request)
    if (!checkRateLimit(clientKey)) {
      return NextResponse.json(
        { 
          message: 'Too many requests. Please wait before submitting again.',
          error: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      )
    }

    const contactData: ContactFormData = await request.json()

    // Enhanced validation
    if (!contactData.name?.trim()) {
      return NextResponse.json(
        { message: 'Name is required', error: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }

    if (!contactData.email?.trim()) {
      return NextResponse.json(
        { message: 'Email is required', error: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(contactData.email.trim())) {
      return NextResponse.json(
        { message: 'Please provide a valid email address', error: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }

    if (!contactData.projectType?.trim()) {
      return NextResponse.json(
        { message: 'Project type is required', error: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }

    if (!contactData.budget?.trim()) {
      return NextResponse.json(
        { message: 'Budget range is required', error: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }

    if (!contactData.timeline?.trim()) {
      return NextResponse.json(
        { message: 'Timeline is required', error: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }

    if (!contactData.message?.trim()) {
      return NextResponse.json(
        { message: 'Project description is required', error: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }

    // Length validation
    if (contactData.name.trim().length > 100) {
      return NextResponse.json(
        { message: 'Name must be less than 100 characters', error: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }

    if (contactData.message.trim().length > 2000) {
      return NextResponse.json(
        { message: 'Message must be less than 2000 characters', error: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }

    if (contactData.message.trim().length < 10) {
      return NextResponse.json(
        { message: 'Message must be at least 10 characters long', error: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }

    // Sanitize input data
    const sanitizedData: ContactFormData = {
      name: contactData.name.trim().slice(0, 100),
      email: contactData.email.trim().toLowerCase(),
      company: contactData.company?.trim().slice(0, 100),
      phone: contactData.phone?.trim().slice(0, 20),
      projectType: contactData.projectType.trim(),
      budget: contactData.budget.trim(),
      timeline: contactData.timeline.trim(),
      message: contactData.message.trim().slice(0, 2000)
    }

    const result = await submitContact(sanitizedData, request)

    return NextResponse.json({
      message: 'Thank you for your message! I\'ll get back to you within 24 hours.',
      success: true,
      id: result._id
    }, { status: 201 })

  } catch (error: any) {
    console.error('Contact form submission error:', error)
    
    // Don't expose internal errors to client
    if (error.message?.includes('duplicate') || error.message?.includes('unique')) {
      return NextResponse.json(
        { 
          message: 'A message with similar content was recently submitted. Please wait before sending another.',
          error: 'DUPLICATE_SUBMISSION'
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Sorry, there was an error processing your message. Please try again or contact me directly.',
        error: 'SERVER_ERROR'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 }
  )
}