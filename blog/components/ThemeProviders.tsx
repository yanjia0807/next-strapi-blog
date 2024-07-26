'use client'

import { ThemeProvider } from 'next-themes'

export function ThemeProviders({
  children,
  defaultTheme,
}: {
  children: React.ReactNode
  defaultTheme: string | undefined
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme={defaultTheme} enableSystem>
      {children}
    </ThemeProvider>
  )
}
