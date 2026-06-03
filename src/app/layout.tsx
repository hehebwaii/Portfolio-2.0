import type { Metadata } from 'next'
import './globals.css'
import SmoothScroller from '@/components/SmoothScroller'
import ClientLayoutManager from '@/components/ClientLayoutManager'

export const metadata: Metadata = {
  title: 'Niranjan S S | Portfolio',
  description: 'Neo-Brutalist portfolio for Niranjan S S. Systems, Light, & Discipline.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayoutManager />
        <SmoothScroller>
          {children}
        </SmoothScroller>
        
        {/* Global SVG Attenuation Filter */}
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
          <filter id="attenuation-noise">
            <feTurbulence 
              id="noise-turbulence"
              type="fractalNoise" 
              baseFrequency="0.0" 
              numOctaves="2" 
              result="noise" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="0" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </svg>
      </body>
    </html>
  )
}
