'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  role: string;
  exp: number;
  name?: string;
}

export default function withAuth<T>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<DecodedToken | null>(null);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          router.push('/login');
        } else {
          setIsAuthenticated(true);
          setUserData(decodedToken);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} user={userData} />;
  };
}
