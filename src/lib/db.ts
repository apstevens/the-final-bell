const DB = "finalbell"; const VER = 1; const LOGS = "logs";
export type IDBLog = { id:string; assignmentId:string; exerciseId:string; ts:string;
  reps?:number; loadKg?:number; seconds?:number; rpe?:number; notes?:string; synced?:0|1 };

function openDB(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB, VER);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(LOGS)) {
        const s = db.createObjectStore(LOGS, { keyPath: "id" });
        s.createIndex("by_synced", "synced");
        s.createIndex("by_assignment", "assignmentId");
      }
    };
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
export async function addLog(l: IDBLog){ const db=await openDB(); await new Promise<void>((res,rej)=>{
  const tx=db.transaction(LOGS,"readwrite"); tx.objectStore(LOGS).put(l);
  tx.oncomplete=()=>res(); tx.onerror=()=>rej(tx.error);
});}
export async function recentLogs(n=20){ const db=await openDB(); return new Promise<IDBLog[]>((res,rej)=>{
  const out:IDBLog[]=[]; const tx=db.transaction(LOGS,"readonly"); const r=tx.objectStore(LOGS).openCursor(null,"prev");
  r.onsuccess=()=>{const c=r.result; if(c&&out.length<n){out.push(c.value as IDBLog); c.continue();} else res(out);};
  r.onerror=()=>rej(r.error);
});}
export async function pendingLogs(){ const db=await openDB(); return new Promise<IDBLog[]>((res,rej)=>{
  const out:IDBLog[]=[]; const tx=db.transaction(LOGS,"readonly"); const idx=tx.objectStore(LOGS).index("by_synced");
  const r=idx.openCursor(IDBKeyRange.only(0)); r.onsuccess=()=>{const c=r.result; if(c){out.push(c.value as IDBLog); c.continue();} else res(out);};
  r.onerror=()=>rej(r.error);
});}
export async function markSynced(ids:string[]){ const db=await openDB(); await new Promise<void>((res,rej)=>{
  const tx=db.transaction(LOGS,"readwrite"); const s=tx.objectStore(LOGS);
  ids.forEach(id=>{ const g=s.get(id); g.onsuccess=()=>{const v=g.result; if(v){v.synced=1; s.put(v);} }; });
  tx.oncomplete=()=>res(); tx.onerror=()=>rej(tx.error);
});}
