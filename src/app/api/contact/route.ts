import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, subject, message } = body
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get client IP and user agent
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Prepare the document for Sanity
    const contactDoc = {
      _type: 'contactSubmission',
      name,
      email,
      phone: body.phone || '',
      subject,
      message,
      tourInterest: body.tourInterest || '',
      travelDate: body.travelDate || null,
      groupSize: body.groupSize ? parseInt(body.groupSize) : null,
      budget: body.budget || '',
      status: 'new',
      submittedAt: new Date().toISOString(),
      ipAddress: ip,
      userAgent: userAgent
    }

    // Create the document in Sanity
    const result = await client.create(contactDoc)

    // Send email notification (optional - you can integrate with your email service)
    // await sendEmailNotification(contactDoc)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: result._id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form submission error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to submit contact form'
      },
      { status: 500 }
    )
  }
}

// Handle GET requests (method not allowed)
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

// Optional: Email notification function
async function sendEmailNotification(contactDoc: any) {
  // Implement your email service integration here
  // Examples: SendGrid, Nodemailer, AWS SES, etc.
  
  console.log('New contact form submission:', {
    name: contactDoc.name,
    email: contactDoc.email,
    subject: contactDoc.subject
  })
  
  // Example with fetch to an external email service:
  /*
  try {
    await fetch('https://your-email-service.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-api-key'
      },
      body: JSON.stringify({
        to: 'contact@yourcompany.com',
        subject: `New Contact Form: ${contactDoc.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactDoc.name}</p>
          <p><strong>Email:</strong> ${contactDoc.email}</p>
          <p><strong>Phone:</strong> ${contactDoc.phone}</p>
          <p><strong>Tour Interest:</strong> ${contactDoc.tourInterest}</p>
          <p><strong>Travel Date:</strong> ${contactDoc.travelDate}</p>
          <p><strong>Group Size:</strong> ${contactDoc.groupSize}</p>
          <p><strong>Budget:</strong> ${contactDoc.budget}</p>
          <p><strong>Subject:</strong> ${contactDoc.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${contactDoc.message}</p>
        `
      })
    })
  } catch (error) {
    console.error('Failed to send email notification:', error)
  }
  */
}