import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import connectDB from '@/utils/mongodb';
import Share from '@/models/Share';
// added comment line to ensure the file is not empty
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

    if (file && typeof file.arrayBuffer === 'function') {
      const buffer = Buffer.from(await file.arrayBuffer());

      // Optional: size check (4.5 MB = 4.5 * 1024 * 1024 bytes)
      if (buffer.length > 4.5 * 1024 * 1024) {
        return NextResponse.json({ error: 'File too large (limit: 4.5 MB)' }, { status: 413 });
      }

      const blob = await put(file.name, buffer, {
        addRandomSuffix: true,
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

    // Save to DB
    const share = await Share.create({
      code,
      type,
      content,
      blobUrl,
    });

    return NextResponse.json({ code: share.code });
  } catch (error) {
    console.error('Share error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
