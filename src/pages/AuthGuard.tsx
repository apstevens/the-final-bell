import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("fb_session");
    if (!token) nav("/login", { replace: true });
    else setReady(true);
  }, [nav]);

  if (!ready) return null;
  return <>{children}</>;
}
