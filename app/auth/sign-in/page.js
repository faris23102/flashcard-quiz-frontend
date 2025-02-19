'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the SignInForm component with SSR disabled
const DynamicSignInForm = dynamic(() => import('./SignInForm'), { ssr: false });

export default function SignInPage() {
  return <DynamicSignInForm />;
}
