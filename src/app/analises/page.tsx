/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import useAuth from '@/components/hooks/useAuth';
import { Button } from '@/components/ui/button';
import LinearChart from '@/components/chart/LinearChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';
import apiUrl from '@/config/config';

export default function Analitcs() {
  const [table, setTable] = useState('');
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Estado do erro inicializado como null
  const { session, status } = useAuth(); // Use o hook personalizado
  const [loadingTables, setLoadingTables] = useState(true); // Estado de carregamento para as tabelas
  const [dataIncrementado, setDataIncrementado] = useState([]);
  const [trainingStats, setTrainingStats] = useState<{ mean_train_score: number; mean_test_score: number; categoria: string } | null>(null);
  const [yearsToPredict, setYearsToPredict] = useState<number | null>(null); // Estado inicializado como null

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchTables = async () => {
        try {
          const response = await fetch(`${apiUrl}/fetch-data/tables`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${(session as any)?.accessToken}`,
            },
          });
          if (!response.ok) {
            throw new Error('Erro ao buscar tabelas');
          }
          const data = await response.json();
          setTables(data.tables || []);
        } catch (error) {
          setTables([]); // Garantir que tables seja um array vazio em caso de erro
        } finally {
          setLoadingTables(false); // Dados carregados, definir loadingTables como false
        }
      };

      fetchTables();
    }
    console.log('tables:', tables); // Log para verificar o estado das tabelas
  }, [status]);

  const handleTrain = async () => {
    if (!table) {
      setError('Selecione uma tabela para treinar o modelo');
      return;
    }
    const queryParams = new URLSearchParams({
      file_key: table
    });

    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/ml-models/train?${queryParams}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      }); // Requisição para treinar o modelo
      if (!response.ok) {
        throw new Error('Erro ao treinar o modelo');
      }
      const data = await response.json();
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Não há modelo de machine-learning para a categoria selecionada, aguarde próxima atualização da aplicação');
      }
      setTrainingStats(data);
      setError(null); // Limpar o erro se a operação for bem-sucedida
    } catch (error) {
      setError((error as Error).message || 'Erro ao treinar o modelo');
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = async () => {
    if (!table) {
      setError('Selecione uma categoria para prever os dados');
      return;
    }

    if (!yearsToPredict) {
      setError('Selecione um periodo para prever os dados');
      return;
    }

    const queryParams = new URLSearchParams({
      file_key: table,
    });

    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= yearsToPredict - 1; i++) {
      queryParams.append('anos_futuros', (currentYear + i).toString());
    }

    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/ml-models/predict?${queryParams}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      }); // Requisição para prever os dados
      if (!response.ok) {
        throw new Error('Erro ao prever os dados');
      }
      const data = await response.json();
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Não há modelo de machine-learning para a categoria selecionada, aguarde próxima atualização da aplicação');
      }
      setDataIncrementado(data.data_incrementado);
      setError(null); // Limpar o erro se a operação for bem-sucedida
    } catch (error) {
      setError((error as Error).message || 'Erro ao treinar o modelo');
    } finally {
      setLoading(false);
    }
  };

  // Função para agrupar dados por produto
  const groupByProduct = (data: any[]) => {
    return data.reduce((acc, item) => {
      const { produto } = item;
      if (!acc[produto]) {
        acc[produto] = [];
      }
      acc[produto].push(item);
      return acc;
    }, {} as Record<string, any[]>);
  };

  // Função para agrupar total_quantidade por ano
  const groupTotalQuantidadeByYear = (data: any[]) => {
    return data.reduce((acc, item) => {
      const { ano, total_quantidade } = item;
      if (!acc[ano]) {
        acc[ano] = { ano, total_quantidade: 0 };
      }
      acc[ano].total_quantidade += total_quantidade;
      return acc;
    }, {} as Record<string, { ano: string, total_quantidade: number }>);
  };

  const groupedData = groupByProduct(dataIncrementado);
  const totalQuantidadeByYear = Object.values(groupTotalQuantidadeByYear(dataIncrementado));

  return (
    <main className='sm:ml-14 p-4'>
      <nav className='flex items-center p-4 rounded-2xl gap-5 bg-gray-200'>
        {loadingTables ? (
          <p>Carregando tabelas...</p>
        ) : (
          <div className='flex space-x-4'>
            <Select onValueChange={setTable}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>
                  {tables.length > 0 ? (
                    tables.map(table => (
                      <SelectItem key={table} value={table}>{table}</SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>Nenhuma categoria disponível</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setYearsToPredict(Number(value))}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder="Selecione anos de previsão" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Anos de Previsão</SelectLabel>
                  {[1, 2, 3].map(year => (
                    <SelectItem key={year} value={year.toString()}>{year} {year === 1 ? 'Ano' : 'Anos'}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className='flex space-x-4'>
          <Button onClick={handleTrain} className='px-4 py-2 rounded-lg' disabled={loading}>
            {loading ? 'Treinando...' : 'Treinar'}
          </Button>
          <Button onClick={handlePredict} className='px-4 py-2 rounded-lg' disabled={loading}>
            {loading ? 'Prevendo...' : 'Prever'}
          </Button>
        </div>
      </nav>
      {error && (
        <div className='mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
          <strong className='font-bold'>Erro! </strong>
          <span className='block sm:inline'>{error}</span>
        </div>
      )}
      <section className='flex flex-col mt-8'>
        <Card className='max-w-md'>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                Modelo de Treinamento
                <span> {trainingStats?.categoria}</span>
              </CardTitle>
              <BarChart2 className='ml-auto w-4 h-4' />
            </div>
            <CardDescription>
              Modelo treinado pelo metodologia de regressão linear simples, abaixo as acúracias do modelo.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex items-center justify-between'>
            <div>
              <p>Score médio de treino: </p>
              <span className='font-bold'>{trainingStats?.mean_train_score}</span>
            </div>
            <div>
              <p>Score médio de teste: </p>
              <span className='font-bold'>{trainingStats?.mean_test_score}</span>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className='grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-2'>
        {groupedData && Object.keys(groupedData).map(produto => (
          <LinearChart key={produto} data={groupedData[produto]} title={`${produto}`} dataKey="quantidade" />
        ))}
        {totalQuantidadeByYear.length > 0 && (
          <LinearChart data={totalQuantidadeByYear} title="Total Quantidade por Ano" dataKey="total_quantidade" />
        )}
      </section>
    </main>
  );
}