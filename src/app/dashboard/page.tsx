'use client';

import { EditProfile } from '@/components/EditProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserAttributes {
  id: number;
  username: string;
  admin: boolean;
  role: string;
  // Adicione outras propriedades conforme necessário
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userAttributes, setUserAttributes] = useState<UserAttributes | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchUserAttributes(session.accessToken);
    }
  }, [session]);

  const fetchUserAttributes = async (token: string) => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/usuarios/logado', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Erro ao recuperar atributos do usuário: ${res.statusText}`);
      }
      const data = await res.json();
      // Transformação direta dos atributos
      const transformedData: UserAttributes = {
        ...data,
        role: data.admin ? 'Administrador' : 'Usuário',
      };
      setUserAttributes(transformedData);
    } catch (error) {
      console.error(error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <main className='flex flex-col items-center justify-center sm:ml-14 p-4'>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      <div className='flex items-center justify-between self-start w-full border-2 rounded-lg shadow-sm md:w-1/2 md:max-w-[600px]'>
        <article className='p-2 flex items-center gap-2 border-b py-2'>
          <Avatar className='w-8 h-8'>
            <AvatarImage src="https://github.com/Renatmf5.png" />
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
          {userAttributes ? (
            <h1 className='text-sm sm:text-lg font-semibold'>{userAttributes.username}</h1>
          ) : (
            <div>Carregando atributos do usuário...</div>
          )}
          {userAttributes ? (
            <h1 className='text-sm sm:text-lg font-semibold'>{userAttributes.admin}</h1>
          ) : (
            <div>Carregando atributos do usuário...</div>
          )}
        </article>
        <EditProfile id={userAttributes?.id ?? 0} />
      </div>
    </main>
  );
}