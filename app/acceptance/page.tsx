'use client';
import { useEffect, useState } from 'react'; import { db } from '@/lib/db'; import type { Task } from '@/lib/types'; import { exportCSV, exportICS } from '@/lib/exports';
export default function Acceptance(){
  const [tasks,setTasks]=useState<Task[]>([]); const [posts,setPosts]=useState(0);
  useEffect(()=>{(async()=>{setTasks(await db.getAll('tasks')); const logs=await db.getAll('networkLogs'); setPosts(logs.filter(l=>l.method==='POST').length)})()},[]);
  return(<div className='card'><h2 className='text-lg font-semibold'>Acceptance</h2>
    <div className='mt-3 text-sm'>Local-only mode: POSTs observed = <b>{posts}</b></div>
    <div className='mt-3 flex gap-2'><button className='btn' onClick={()=>exportCSV(tasks)}>CSV</button>
    <button className='btn' onClick={()=>exportICS(tasks)}>.ics</button><button className='btn' onClick={()=>window.print()}>PDF</button></div>
  </div>);
}
