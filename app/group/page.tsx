'use client';
import { useEffect, useState } from 'react'; import { db } from '@/lib/db';
import type { PropertyItem } from '@/lib/types'; import { ensureSeeded } from '@/lib/seed';
export default function GroupPage(){
  const [properties,setProperties]=useState<PropertyItem[]>([]);
  useEffect(()=>{ensureSeeded().then(load)},[]);
  async function load(){setProperties(await db.getAll('shortlist'));}
  async function addProperty(){await db.add('shortlist',{id:crypto.randomUUID(),title:'New property',notes:'',privacy:'shared'}); load();}
  async function updateProperty(p:PropertyItem){await db.put('shortlist',p); load();}
  async function removeProperty(id:string){await db.delete('shortlist',id); load();}
  return(<div className='grid gap-6'>
    <section className='card'><div className='flex items-center justify-between'>
      <h2 className='text-lg font-semibold'>Shortlist</h2><button className='btn' onClick={addProperty}>Add property</button></div>
      <table className='w-full text-sm mt-3'><thead><tr><th>Title</th><th>Notes</th><th>Privacy</th><th></th></tr></thead>
      <tbody>{properties.map(p=>(<tr key={p.id}>
        <td><input className='input' value={p.title} onChange={e=>updateProperty({...p,title:e.target.value})}/></td>
        <td><input className='input' value={p.notes||''} onChange={e=>updateProperty({...p,notes:e.target.value})}/></td>
        <td><select className='input' value={p.privacy} onChange={e=>updateProperty({...p,privacy:e.target.value as any})}>
          <option value='private'>private</option><option value='shared'>shared</option></select></td>
        <td><button className='btn' onClick={()=>removeProperty(p.id)}>Remove</button></td>
      </tr>))}</tbody></table></section>
  </div>);
}
