import { client } from '../sanity/lib/client'

interface TestResult {
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

// Test function to verify Sanity connection
export async function testSanityConnection(): Promise<TestResult> {
  try {
    // Simple query to test connection
    const result = await client.fetch('*[_type == "heroSection"][0...1]')
    console.log('✅ Sanity connection successful!')
    console.log('Available documents:', result)
    return { success: true, data: result }
  } catch (error: any) {
    console.error('❌ Sanity connection failed:', error)
    return { success: false, error: error?.message || 'Unknown error' }
  }
}

// Test all schema types
export async function testAllSchemas(): Promise<SchemaResults> {
  const schemas = ['heroSection', 'featuresSection', 'testimonial', 'blogPost']
  const results: SchemaResults = {}
  
  for (const schema of schemas) {
    try {
      const count = await client.fetch(`count(*[_type == "${schema}"])`)
      results[schema] = { success: true, count }
      console.log(`✅ ${schema}: ${count} documents`)
    } catch (error: any) {
      results[schema] = { success: false, error: error?.message || 'Unknown error' }
      console.error(`❌ ${schema}: ${error?.message || 'Unknown error'}`)
    }
  }
  
  return results
}