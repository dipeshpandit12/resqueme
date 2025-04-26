'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const PUBLIC_PATHS = ['/'];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(pathname);
  }, [pathname]);

  const authCheck = (url: string) => {
    const path = url.split('?')[0];
    const isPublicPath = PUBLIC_PATHS.includes(path);
    const token = localStorage.getItem('dashboard_auth');

    if (!token && !isPublicPath) {
      setAuthorized(false);
      router.push('/');
    } else {
      setAuthorized(true);
    }
  };

  return authorized ? <>{children}</> : <></>;
}