'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import dynamicImport from 'next/dynamic';
import React, { Suspense } from 'react';

// Dynamically import SignInForm with SSR disabled.
const DynamicSignInForm = dynamicImport(() => import('./SignInForm'), { ssr: false });

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicSignInForm />
    </Suspense>
  );
}
