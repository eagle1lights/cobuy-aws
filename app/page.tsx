import Link from 'next/link';
export default function Page(){
  return(<div className='card'><h1 className='text-2xl font-semibold'>CoBuy (AWS Cloud)</h1>
    <p className='text-slate-300 mt-1'>Static Next.js app hosted on AWS Amplify. Local-first data; no network writes.</p>
    <div className='mt-4 flex gap-3'>
      <Link className='btn' href='/buyer'>Buyer PM</Link>
      <Link className='btn' href='/group'>Group</Link>
      <Link className='btn' href='/legal'>Legal</Link>
    </div></div>);
}
