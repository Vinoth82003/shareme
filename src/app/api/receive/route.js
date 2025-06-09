import { NextResponse } from 'next/server';
import connectDB from '@/utils/mongodb';
import Share from '@/models/Share';

export async function POST(req) {
  try {
    await connectDB();
    const { code } = await req.json();

    if (!code || code.length !== 4) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
    }

    const share = await Share.findOne({ code });

    if (!share) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      type: share.type,
      content: share.content,
      blobUrl: share.blobUrl,
    });
  } catch (err) {
    console.error('Receive error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
