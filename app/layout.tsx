import './globals.css'; import Link from 'next/link'; import type { ReactNode } from 'react';
import { NetworkLogDrawer } from '@/components/NetworkLogDrawer';
export const metadata={title:'CoBuy (AWS Cloud)',description:'Privacy-first MVP'};
export default function RootLayout({children}:{children:ReactNode}){
  return(<html lang='en'><body>
    <header className='border-b border-slate-800'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4'>
        <nav className='flex items-center gap-4 text-sm'>
          <Link href='/'>Home</Link><Link href='/buyer'>Buyer PM</Link>
          <Link href='/group'>Group</Link><Link href='/legal'>Legal</Link><Link href='/acceptance'>Acceptance</Link>
        </nav>
        <NetworkLogDrawer/>
      </div>
    </header>
    <main className='max-w-6xl mx-auto px-4 py-6'>{children}</main>
  </body></html>);
}
