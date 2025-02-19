'use client';

export const dynamic = 'force-dynamic'; // Force client-only rendering

import dynamicImport from 'next/dynamic';
import React from 'react';

// Dynamically import SignInForm with SSR disabled.
// We use the loading option to show a fallback without needing Suspense.
const DynamicSignInForm = dynamicImport(() => import('./SignInForm'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function SignInPage() {
  return <DynamicSignInForm />;
}
