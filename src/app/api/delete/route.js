import BlobUrl from '@/models/BlobUrls';
import { NextResponse } from 'next/server';

export async function GET(request) {
    return NextResponse.json({ Message: "Testing API"});
}

export async function DELETE(request) {
  const body = await request.json(); // ← parse body manually
  const { code } = body;
  console.log("CODE: " + code);
    const blobUrls = await BlobUrl.find({});
    
  return NextResponse.json({ message: "Received code: " + code });
}
