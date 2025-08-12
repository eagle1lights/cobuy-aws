import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Task, PropertyItem, Poll } from './types';

interface Store extends DBSchema {
  tasks: { key: string; value: Task };
  shortlist: { key: string; value: PropertyItem };
  polls: { key: string; value: Poll };
  files: { key: string; value: any };
  settings: { key: string; value: any };
  networkLogs: { key: number; value: { ts: number; method: string; url: string } };
}

// Only initialize in the browser (SSG build runs in Node without indexedDB)
const isBrowser = typeof window !== 'undefined' && typeof indexedDB !== 'undefined';

let dbp: Promise<IDBPDatabase<Store>> | null = null;
function getDB() {
  if (!isBrowser) {
    // During build/SSR, just avoid touching IndexedDB.
    // Our pages call these methods inside useEffect, so this path won’t be hit at runtime.
    throw new Error('IndexedDB not available in this environment');
  }
  if (!dbp) {
    dbp = openDB<Store>('cobuy_paths', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('tasks')) db.createObjectStore('tasks', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('shortlist')) db.createObjectStore('shortlist', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('polls')) db.createObjectStore('polls', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('files')) db.createObjectStore('files', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('settings')) db.createObjectStore('settings', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('networkLogs')) db.createObjectStore('networkLogs', { keyPath: 'ts' });
      },
    });
  }
  return dbp;
}

export const db = {
  async add(store: keyof Store, value: any) {
    if (!isBrowser) return; // no-op during build
    return (await getDB()).add(store as any, value);
  },
  async put(store: keyof Store, value: any) {
    if (!isBrowser) return;
    return (await getDB()).put(store as any, value);
  },
  async delete(store: keyof Store, key: any) {
    if (!isBrowser) return;
    return (await getDB()).delete(store as any, key);
  },
  async getAll(store: keyof Store) {
    if (!isBrowser) return [] as any[];
    return (await getDB()).getAll(store as any) as any;
  },
};
