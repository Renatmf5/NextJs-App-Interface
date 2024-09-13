'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });
    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main>
      <div className='h-screen flex justify-center items-center bg-slate-100 px-5'>
        <form className='bg-white p-8 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2 shadow-lg border-2 border-gray-300'
          onSubmit={handleSubmit}>
          <h2 className='font-bold text-xl mb-3'>Faça seu Login</h2>
          <input
            className='w-full p-2 rounded-xl border-2 border-gray-300 focus:border-primary focus:shadow-sm focus:shadow-primary'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='w-full p-2 rounded-xl border-2 border-gray-300 focus:border-primary focus:shadow-sm focus:shadow-primary'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className='w-full' type="submit">Login</Button>
          <Link href='/auth/signup' className='self-end text-sm text-primary underline'>Criar novo usuário</Link>
          {error && <p className='text-red-600'>{error}</p>}
        </form>
      </div>
    </main>
  );
}