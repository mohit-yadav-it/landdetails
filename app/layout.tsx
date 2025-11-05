import './globals.css'
import type { Metadata } from 'next'
import Navbar from './component/navbar'
import { FormProvider } from './context/FormContext'

import { Open_Sans, Inter } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '2bigha Land Details Form',
  description: '2bigha Land Details Form',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${inter.variable}`}>
      <body>
        <FormProvider>
          <Navbar />
          {children}
        </FormProvider>
      </body>
    </html>
  )
}
