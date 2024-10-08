"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Factory, Plane, ShoppingCart, Truck, Wine } from 'lucide-react';
import { useState } from 'react';
import useAuth from '@/components/hooks/useAuth';

export default function Extrair() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { session, status } = useAuth(); // Use o hook personalizado

  const handleButtonClick = async (endpoint: string) => {
    if (!session?.accessToken) {
      setSuccessMessage(null);
      setErrorMessage('Usuário não encontrado');
      return;
    }
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/${endpoint}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Erro ao chamar o endpoint: ${res.statusText}`);
      }
      const data = await res.json();
      if (data.status === 'Dados de produção extraídos com sucesso') {
        setSuccessMessage('Dados carregados com sucesso no data-lake!');
      } else if (data.status === 'Usuário não autorizado') {
        setErrorMessage('Usuário não autorizado!');
      } else {
        setSuccessMessage('Dados carregados com sucesso no data-lake!');
      }
    } catch (error) {
      setErrorMessage('Erro ao carregar os dados no data-lake');
    } finally {
      setLoading(false);
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
      <h1 className='mt-20 p-5 text-2xl font-bold'>Conexão com API FastAPI</h1>
      <div className='p-20 grid grid-cols2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
        <Card className='flex flex-col justify-between'>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                Produção
              </CardTitle>
              <Factory className='ml-auto w-4 h-4' />
            </div>
            <CardDescription>
              Extração dos dados de produção para a Vinicola VitiVinicultura
            </CardDescription>
          </CardHeader>
          <CardContent className='text-base sm:text-lg font-bold mt-auto'>
            <Button
              className=' w-full p-2 rounded'
              onClick={() => handleButtonClick('producao/download-arquivo')}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Baixar dados'}
            </Button>
          </CardContent>
        </Card>

        <Card className='flex flex-col justify-between'>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                Processamento
              </CardTitle>
              <Wine className='ml-auto w-4 h-4' />
            </div>
            <CardDescription>
              Extração dos dados de processamento de uvas para a Vinícola VitiVinicultura
            </CardDescription>
          </CardHeader>
          <CardContent className='text-base sm:text-lg font-bold mt-auto'>
            <Button
              className='w-full p-2 rounded'
              onClick={() => handleButtonClick('processamento/download-arquivo')}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Baixar dados'}
            </Button>
          </CardContent>
        </Card>

        <Card className='flex flex-col justify-between'>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                Comercialização
              </CardTitle>
              <ShoppingCart className='ml-auto w-4 h-4' />
            </div>
            <CardDescription>
              Extração dos dados de comercialização de uvas Viníferas, Americanas, Uvas de mesa e sem classificação da a Vinícola VitiVinicultura
            </CardDescription>
          </CardHeader>
          <CardContent className='text-base sm:text-lg font-bold mt-auto'>
            <Button
              className='w-full p-2 rounded'
              onClick={() => handleButtonClick('comercializacao/download-arquivo')}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Baixar dados'}
            </Button>
          </CardContent>
        </Card>

        <Card className='flex flex-col justify-between'>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                Importação
              </CardTitle>
              <Truck className='ml-auto w-4 h-4' />
            </div>
            <CardDescription>
              Extração dos dados de Importação de Vinhos de mesa, Espumantes, Uvas frescas, passas e suco de uva da a Vinícola VitiVinicultura
            </CardDescription>
          </CardHeader>
          <CardContent className='text-base sm:text-lg font-bold mt-auto'>
            <Button
              className='w-full p-2 rounded'
              onClick={() => handleButtonClick('importacao/download-arquivo')}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Baixar dados'}
            </Button>
          </CardContent>
        </Card>

        <Card className='flex flex-col justify-between'>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                Exportação
              </CardTitle>
              <Plane className='ml-auto w-4 h-4' />
            </div>
            <CardDescription>
              Extração dos dados de exportação de Vinhos de mesa, Espumantes, Uvas frescas e suco de uva da a Vinícola VitiVinicultura
            </CardDescription>
          </CardHeader>
          <CardContent className='text-base sm:text-lg font-bold mt-auto'>
            <Button
              className='w-full p-2 rounded'
              onClick={() => handleButtonClick('exportacao/download-arquivo')}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Baixar dados'}
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className='flex flex-col items-center mt-4'>
        <h2 className='font-bold'>Resposta da API:</h2>
        {successMessage && (
          <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative' role='alert'>
            <strong className='font-bold'>Sucesso! </strong>
            <span className='block sm:inline'>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
            <strong className='font-bold'>Erro! </strong>
            <span className='block sm:inline'>{errorMessage}</span>
          </div>
        )}
      </div>
    </main>
  );
}