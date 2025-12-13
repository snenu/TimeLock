import axios from 'axios';

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;
const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

export async function uploadToPinata(data: string | File, name: string): Promise<string> {
  if (typeof data === 'string') {
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      {
        pinataContent: { content: data, timestamp: Date.now() },
        pinataMetadata: { name }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
        }
      }
    );
    return response.data.IpfsHash;
  } else {
    const formData = new FormData();
    formData.append('file', data);
    formData.append('pinataMetadata', JSON.stringify({ name }));

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${PINATA_JWT}`,
        }
      }
    );
    return response.data.IpfsHash;
  }
}

export async function fetchFromPinata(hash: string): Promise<string> {
  const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${hash}`);
  return typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
}

export function getIPFSUrl(hash: string): string {
  return `https://gateway.pinata.cloud/ipfs/${hash}`;
}
