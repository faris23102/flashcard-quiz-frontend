'use client';

export const dynamic = 'force-dynamic'; // Force dynamic (client-only) rendering

import dynamicImport from 'next/dynamic'; // Rename the import to avoid conflict
import React, { Suspense } from 'react';

// Dynamically import the SignInForm component with SSR disabled
const DynamicSignInForm = dynamicImport(() => import('./SignInForm'), { ssr: false });

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicSignInForm />
    </Suspense>
  );
}
