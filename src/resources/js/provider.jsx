// app/providers.tsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import React from 'react'
import { useEffect } from 'react'


export function PHProvider({
  children,
}) {
    useEffect(() => {
        console.log(import.meta.env.VITE_NEXT_PUBLIC_POSTHOG_KEY)
        const posthogKey = import.meta.env.VITE_NEXT_PUBLIC_POSTHOG_KEY;
        console.log(posthogKey)
        const posthogHost = import.meta.env.VIYE_NEXT_PUBLIC_POSTHOG_HOST;
        posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true // Disable automatic pageview capture, as we capture manually
      })
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}