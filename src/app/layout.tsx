
import { Logo } from '@/components/Logo'
import './globals.css'
import type { Metadata } from 'next'
import { Bai_Jamjuree } from 'next/font/google'
import { SideBar } from '@/components/Sidebar'
import GDPR from '@/components/feedback/Gdpr'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const inter = Bai_Jamjuree({ weight: ['500'], subsets: ['thai'] })

export const metadata: Metadata = {
  title: 'Calculadora de Transferência e Gratificação de representação para Militares',
  description: 'Aplicação que calcula aproximadamente o ganho do militar com a transferência ou com a gratificação de representação, não se tratando de uma plataforma oficial e sim de um calculadora para auxiliar no planejamento.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="pt" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Logo />
        <SideBar />
        <ToastContainer />

        <GDPR />

        {children}

      </body>
    </html>
  )
}
