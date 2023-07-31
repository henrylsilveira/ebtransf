import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calculadora de Transferência e Gratificação de representação para Militares',
  description: 'Aplicação que calcula aproximadamente o ganho do militar com a transferência ou com a gratificação de representação, não se tratando de uma plataforma oficial e sim de um calculadora para auxiliar no planejamento.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
