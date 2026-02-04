import { NextRequest, NextResponse } from 'next/server';

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;
const PINATA_JWT = process.env.PINATA_JWT;

export async function POST(request: NextRequest) {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Pinata API not configured' },
      { status: 500 }
    );
  }

  const contentType = request.headers.get('content-type') || '';

  try {
    if (contentType.includes('application/json')) {
      const { content, name } = await request.json();
      if (!content || !name) {
        return NextResponse.json(
          { error: 'Missing content or name' },
          { status: 400 }
        );
      }
      const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
        },
        body: JSON.stringify({
          pinataContent: typeof content === 'string' ? { content, timestamp: Date.now() } : content,
          pinataMetadata: { name },
        }),
      });
      if (!response.ok) {
        const err = await response.text();
        console.error('Pinata JSON pin error:', response.status, err);
        return NextResponse.json({ error: 'Pinata upload failed' }, { status: 502 });
      }
      const data = await response.json();
      return NextResponse.json({ ipfsHash: data.IpfsHash });
    }

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      const name = (formData.get('name') as string) || file?.name || 'timelock-file';
      if (!file) {
        return NextResponse.json({ error: 'Missing file' }, { status: 400 });
      }
      if (!PINATA_JWT) {
        return NextResponse.json(
          { error: 'Pinata JWT not configured for file upload' },
          { status: 500 }
        );
      }
      const body = new FormData();
      body.append('file', file);
      body.append('pinataMetadata', JSON.stringify({ name }));

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`,
        },
        body,
      });
      if (!response.ok) {
        const err = await response.text();
        console.error('Pinata file pin error:', response.status, err);
        return NextResponse.json({ error: 'Pinata upload failed' }, { status: 502 });
      }
      const data = await response.json();
      return NextResponse.json({ ipfsHash: data.IpfsHash });
    }

    return NextResponse.json(
      { error: 'Content-Type must be application/json or multipart/form-data' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Pinata upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
