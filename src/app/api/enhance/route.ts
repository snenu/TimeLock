import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { message, recipientType } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const contextMap: Record<string, string> = {
      self: 'future self - make it motivational and reflective',
      partner: 'romantic partner - make it loving and heartfelt',
      family: 'family member - make it warm and caring',
      child: 'child - make it gentle, encouraging, and age-appropriate',
      friend: 'close friend - make it friendly and supportive',
      custom: 'someone special - make it thoughtful and meaningful',
    };

    const context = contextMap[recipientType] || contextMap.custom;

    const prompt = `You are helping someone write a heartfelt time capsule message to their ${context}. 

The original message is:
"${message}"

Please enhance this message to make it more emotionally impactful and meaningful while preserving the original sentiment and intent. Keep it personal and authentic. Do not make it too long - keep it concise but powerful. Return only the enhanced message, no explanations or quotes around it.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return NextResponse.json({ 
        error: 'Failed to enhance message', 
        details: errorText 
      }, { status: 500 });
    }

    const data = await response.json();
    const enhanced = data.candidates?.[0]?.content?.parts?.[0]?.text || message;

    return NextResponse.json({ enhanced });
  } catch (error) {
    console.error('Enhancement error:', error);
    return NextResponse.json({ error: 'Failed to enhance message' }, { status: 500 });
  }
}