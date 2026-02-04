import axios from 'axios';

/**
 * Upload data to IPFS via the server-side Pinata API (keeps keys server-only).
 * For JSON: sends to POST /api/pinata/upload with { content, name }.
 * For File: sends FormData with 'file' and 'name'.
 */
export async function uploadToPinata(data: string | File, name: string): Promise<string> {
  if (typeof data === 'string') {
    const response = await fetch('/api/pinata/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: data, name }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error((err as { error?: string }).error || 'Upload failed');
    }
    const result = await response.json();
    return result.ipfsHash;
  }
  const formData = new FormData();
  formData.append('file', data);
  formData.append('name', name);
  const response = await fetch('/api/pinata/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error((err as { error?: string }).error || 'Upload failed');
  }
  const result = await response.json();
  return result.ipfsHash;
}

export async function fetchFromPinata(hash: string): Promise<string> {
  const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${hash}`);
  return typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
}

export function getIPFSUrl(hash: string): string {
  return `https://gateway.pinata.cloud/ipfs/${hash}`;
}
