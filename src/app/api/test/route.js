import { NextResponse } from 'next/server';

export async function GET(request) {
    return NextResponse.json({ Message: "Testing API"});
  }