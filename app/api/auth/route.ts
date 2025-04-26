import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'resqme-secret-key';
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || 'responder123';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (password === DASHBOARD_PASSWORD) {
            // Create JWT token
            const token = sign(
                { authorized: true },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Set HTTP-only cookie
            (await
                // Set HTTP-only cookie
                cookies()).set('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 24 hours
            });

            return NextResponse.json({
                success: true,
                message: 'Authentication successful'
            });
        }

        return NextResponse.json({
            success: false,
            message: 'Invalid password'
        }, { status: 401 });

    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json({ 
            success: false,
            message: 'Server error'
        }, { status: 500 });
    }
}