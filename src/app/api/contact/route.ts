import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message, botcheck } = await request.json();

    // Honeypot validation - silently drop the spam
    if (botcheck) {
      return NextResponse.json({ 
        success: true, 
        message: 'TRANSMISSION SUCCESSFUL. TELEMETRY LOCK ESTABLISHED.' 
      });
    }

    const accessKey = process.env.WEB3FORMS_KEY;
    if (!accessKey) {
      return NextResponse.json({ 
        success: false, 
        message: 'CRITICAL ERROR: SECURE TRANSMISSION KEY NOT CONFIGURED.' 
      }, { status: 500 });
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
      }),
    });

    const contentType = response.headers.get('content-type');
    let result: any = {};
    
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      const text = await response.text();
      console.error('Web3Forms returned non-JSON response:', text);
      return NextResponse.json({ 
        success: false, 
        message: 'TRANSMISSION ROUTING FAILURE. HOST RESPONSE EXCEPTION.' 
      }, { status: response.status });
    }

    if (response.ok && result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'TRANSMISSION SUCCESSFUL. TELEMETRY LOCK ESTABLISHED.' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: result.message || 'TRANSMISSION ROUTING FAILURE. TRY AGAIN.' 
      }, { status: response.status });
    }
  } catch (error) {
    console.error('Secure contact proxy error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'TRANSMISSION SHIELD COLLISION. CONNECTION RESET.' 
    }, { status: 500 });
  }
}
