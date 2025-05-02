"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, PawPrint as Paw } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [loginButtonText, setLoginButtonText] = useState('Login');
  const [verifyButtonText, setVerifyButtonText] = useState('Verify OTP');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setAuthToken(token);
    setIsAuthChecked(true); // Ensures auth check is done before rendering
  }, []);

  const handleLoginClick = async () => {
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    let email = emailInput ? emailInput.value : '';
    setLoginButtonText('Getting OTP...');
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_PROD_URL}/auth/login`, { email });
      localStorage.setItem("otp_token", response.data.token);
      setIsOtpSent(true);
      setCanResend(false);
      setTimeout(() => setCanResend(true), 120000);
      emailInput.value = ''; // Clear input field
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoginButtonText('Login');
    }
  };

  const handleVerifyOtpClick = async () => {
    const otpInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    const otp = otpInput ? otpInput.value : '';
    const otpToken = localStorage.getItem('otp_token');
    setVerifyButtonText('Verifying OTP...');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_PROD_URL}/auth/verify-otp`, { otp }, {
        headers: { Authorization: `Bearer ${otpToken}` }
      });
      localStorage.setItem("auth_token", response.data.user.accessToken);
      localStorage.removeItem('otp_token');
      setAuthToken('verified');
      otpInput.value = '';

      // Emit custom event for authentication change
      const authEvent = new CustomEvent('authChange', { detail: { isAuthenticated: true } });
      window.dispatchEvent(authEvent);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setVerifyButtonText('Verify OTP');
    }
  };

  if (!isAuthChecked) return null;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="flex justify-center mb-8">
          <Paw className="h-16 w-16 text-primary animate-bounce" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Create and Share Pet Stories
        </h1>

        <p className="text-lg text-muted-foreground">
          Join our vibrant community of pet lovers. Share stories, find help, and connect with fellow animal enthusiasts.
        </p>

        <div className="flex justify-center">
          {authToken ? (
            <Link href="/create-post">
              <Button size="lg" className="comic-button group">
                Create a Post
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col items-center">
              {isOtpSent ? (
                <>
                  <input type="text" placeholder="Enter 6-digit OTP" className="mb-2 p-2 border rounded" maxLength={6} />
                  <Button size="lg" className="comic-button group" disabled={loginButtonText === "Verifying OTP..."}  onClick={handleVerifyOtpClick}>
                    {verifyButtonText}
                  </Button>
                  <Button size="lg" className="comic-button group mt-2" disabled={!canResend} onClick={handleLoginClick}>
                    {canResend ? 'Resend OTP' : 'Resend in 2 mins'}
                  </Button>
                </>
              ) : (
                <>
                  <input type="email" placeholder="Enter your email" className="mb-2 p-2 border rounded" />
                  <Button size="lg" className="comic-button group" disabled={loginButtonText !== "Login"} onClick={handleLoginClick}>
                    {loginButtonText}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { type: 'Standard', icon: '📝' },
            { type: 'Story', icon: '📖' },
            { type: 'Poll', icon: '📊' },
            { type: 'Campaign', icon: '🎯' },
            { type: 'Emergency', icon: '🚨' },
            { type: 'Volunteer', icon: '🤝' },
          ].map(({ type, icon }) => (
            <div
              key={type}
              className="bg-card comic-border rounded-lg p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-medium text-lg mb-2">{type} Post</h3>
              <p className="text-sm text-muted-foreground">
                Create a {type.toLowerCase()} post to engage with your audience.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
