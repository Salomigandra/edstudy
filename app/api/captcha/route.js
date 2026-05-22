import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: 'Missing captcha token' }, { status: 400 });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      // Allow bypass in dev if key not set yet
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({ success: true, score: 1.0 });
      }
      return NextResponse.json({ success: false, error: 'Captcha not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      { method: 'POST' }
    );
    const data = await response.json();

    // reCAPTCHA v3 returns a score 0.0–1.0; >= 0.5 is human
    if (!data.success || data.score < 0.5) {
      return NextResponse.json(
        { success: false, error: 'Captcha verification failed. Please try again.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, score: data.score });
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
