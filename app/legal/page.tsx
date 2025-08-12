'use client';
import { useEffect } from 'react'; import { ensureSeeded } from '@/lib/seed';
export default function Legal(){ useEffect(()=>{ensureSeeded()},[]);
  return(<div className='card'><h2 className='text-lg font-semibold'>Legal wizard (demo)</h2>
    <p className='text-slate-300 mt-2'>Pick structure, upload encrypted files in a fuller version. This MVP demonstrates static hosting + local data only.</p>
  </div>);
}
