'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

interface ContactFormProps {
  className?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  tourInterest: string
  travelDate: string
  groupSize: string
  budget: string
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    tourInterest: '',
    travelDate: '',
    groupSize: '',
    budget: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        tourInterest: '',
        travelDate: '',
        groupSize: '',
        budget: ''
      })
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const tourOptions = [
    { value: '', label: 'Select tour type...' },
    { value: 'packages', label: 'Tour Packages' },
    { value: 'custom', label: 'Custom Tours' },
    { value: 'group', label: 'Group Tours' },
    { value: 'private', label: 'Private Tours' },
    { value: 'adventure', label: 'Adventure Tours' },
    { value: 'cultural', label: 'Cultural Tours' },
    { value: 'general', label: 'General Inquiry' }
  ]

  const budgetOptions = [
    { value: '', label: 'Select budget range...' },
    { value: 'under-5m', label: 'Under 5 Million IDR' },
    { value: '5-10m', label: '5-10 Million IDR' },
    { value: '10-20m', label: '10-20 Million IDR' },
    { value: '20-50m', label: '20-50 Million IDR' },
    { value: 'over-50m', label: 'Over 50 Million IDR' }
  ]

  return (
    <AnimatedSection className={`bg-white rounded-lg shadow-lg p-8 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black mb-2">Get in Touch</h2>
        <p className="text-gray-600">Ready to plan your adventure? Fill out the form below and we'll get back to you soon!</p>
      </div>

      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
        >
          Thank you for your message! We'll get back to you within 24 hours.
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
        >
          Error: {errorMessage}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="+62 812 3456 7890"
            />
          </div>

          <div>
            <label htmlFor="tourInterest" className="block text-sm font-medium text-gray-700 mb-2">
              Tour Interest
            </label>
            <select
              id="tourInterest"
              name="tourInterest"
              value={formData.tourInterest}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {tourOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Travel Date
            </label>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-2">
              Group Size
            </label>
            <input
              type="number"
              id="groupSize"
              name="groupSize"
              min="1"
              max="50"
              value={formData.groupSize}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Number of travelers"
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {budgetOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject and Message */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="What can we help you with?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Tell us more about your travel plans, preferences, or any questions you have..."
          />
        </div>

        {/* Submit Button */}
        <div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </div>
      </form>
    </AnimatedSection>
  )
}