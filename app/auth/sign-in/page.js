'use client';

export const dynamic = 'force-dynamic'; // Force client-only rendering

import dynamicImport from 'next/dynamic';
import React, { Suspense } from 'react';

// Dynamically import the SignInForm component with SSR disabled.
const DynamicSignInForm = dynamicImport(() => import('./SignInForm'), { ssr: false });

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicSignInForm />
    </Suspense>
  );
}
