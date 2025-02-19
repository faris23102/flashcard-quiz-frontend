'use client';

export const dynamic = 'force-dynamic'; // Force dynamic (client-only) rendering

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

// Dynamically import SignInForm with SSR disabled
const DynamicSignInForm = dynamic(() => import('./SignInForm'), { ssr: false });

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicSignInForm />
    </Suspense>
  );
}
