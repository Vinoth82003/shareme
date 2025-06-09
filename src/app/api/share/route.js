import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import connectDB from '@/utils/mongodb';
import Share from '@/models/Share';

export async function POST(request) {
  try {
    await connectDB();

    const data = await request.formData();
    const file = data.get('file');
    const text = data.get('text');
    
    // Generate a random 4-digit code
    const generateCode = () => Math.floor(1000 + Math.random() * 9000).toString();
    let code = generateCode();
    
    // Ensure code uniqueness
    while (await Share.findOne({ code })) {
      code = generateCode();
    }

    let content, type, blobUrl;

    if (file) {
      // Upload file to Vercel Blob
      const blob = await put(file.name, file, {
        access: 'public',
      });
      
      blobUrl = blob.url;
      content = file.name;
      type = 'file';
    } else if (text) {
      content = text;
      type = 'text';
    } else {
      return NextResponse.json({ error: 'No content provided' }, { status: 400 });
    }

    // Save to MongoDB
    const share = await Share.create({
      code,
      type,
      content,
      blobUrl
    });

    return NextResponse.json({ code: share.code });
  } catch (error) {
    console.error('Share error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}