import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: /api/submit-order
 * 
 * This route acts as a proxy to your external API.
 * It forwards the order data from the checkout form to your external API endpoint.
 * 
 * Environment Variables Required:
 * - EXTERNAL_API_URL: The URL of your external API endpoint
 * - EXTERNAL_API_KEY (optional): API key/token for authentication
 * 
 * Request Body Structure:
 * {
 *   phone: string,
 *   email: string,
 *   notes: string,
 *   cartItems: CartItem[],
 *   total: number
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get the external API URL from environment variables
    const apiUrl = process.env.EXTERNAL_API_URL;
    
    if (!apiUrl) {
      return NextResponse.json(
        { error: 'API URL not configured' },
        { status: 500 }
      );
    }

    // Optional: Get API key or token from environment variables
    const apiKey = process.env.EXTERNAL_API_KEY;

    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add API key to headers if provided
    // Customize the authentication method based on your API requirements:
    if (apiKey) {
      // Bearer token (most common)
      headers['Authorization'] = `Bearer ${apiKey}`;
      
      // Alternative authentication methods (uncomment if needed):
      // headers['X-API-Key'] = apiKey;
      // headers['Authorization'] = `Basic ${Buffer.from(apiKey).toString('base64')}`;
    }

    // Call your external API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({...body, "order_source": "gdlglow"}),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to submit order', details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting order:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

