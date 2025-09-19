'use client'

import { useEffect, useState } from 'react'
import { testSanityConnection, testAllSchemas } from '../../utils/testSanityConnection'

interface ConnectionResult {
  success: boolean
  data?: any
  error?: string
}

interface SchemaTestResult {
  success: boolean
  count?: number
  error?: string
}

interface SchemaResults {
  [key: string]: SchemaTestResult
}

interface TestResult {
  connection: ConnectionResult
  schemas: SchemaResults
}

export default function TestSanityPage() {
  const [results, setResults] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function runTests() {
      setLoading(true)
      try {
        const connectionTest = await testSanityConnection()
        const schemaTests = await testAllSchemas()
        
        setResults({
          connection: connectionTest,
          schemas: schemaTests
        })
      } catch (error) {
        console.error('Test failed:', error)
      } finally {
        setLoading(false)
      }
    }

    runTests()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Testing Sanity CMS connection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-light py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          Sanity CMS Connection Test
        </h1>
        
        {/* Connection Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            {results?.connection?.success ? (
              <span className="text-green-500 mr-2">✅</span>
            ) : (
              <span className="text-red-500 mr-2">❌</span>
            )}
            Connection Test
          </h2>
          
          {results?.connection?.success ? (
            <div className="text-green-700">
              <p className="font-medium">Connection successful!</p>
              <p className="text-sm text-black mt-2">
                Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              </p>
              <p className="text-sm text-black">
                Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET}
              </p>
            </div>
          ) : (
            <div className="text-red-700">
              <p className="font-medium">Connection failed!</p>
              <p className="text-sm mt-2">{results?.connection?.error}</p>
            </div>
          )}
        </div>

        {/* Schema Tests */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Schema Tests</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results?.schemas && Object.entries(results.schemas).map(([schema, result]: [string, any]) => (
              <div key={schema} className="border rounded-lg p-4">
                <h3 className="font-medium flex items-center mb-2">
                  {result.success ? (
                    <span className="text-green-500 mr-2">✅</span>
                  ) : (
                    <span className="text-red-500 mr-2">❌</span>
                  )}
                  {schema}
                </h3>
                
                {result.success ? (
                  <p className="text-sm text-black">
                    Documents: {result.count}
                  </p>
                ) : (
                  <p className="text-sm text-red-600">
                    Error: {result.error}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Studio Link */}
        <div className="mt-8 text-center">
          <a 
            href="/studio" 
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Open Sanity Studio
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}