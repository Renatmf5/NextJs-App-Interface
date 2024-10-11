/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useAuth from '@/components/hooks/useAuth';

// Definição do modelo DataResponse para corresponder ao modelo no backend
interface DataResponse {
  columns: string[];
  data: string[][];
}

// Definição do modelo de dados para a tabela
interface TableData {
  [key: string]: string;
}

export default function Dados() {
  const [data, setData] = useState<TableData[]>([]);
  const [table, setTable] = useState('');
  const [filters, setFilters] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tables, setTables] = useState<string[]>([]);
  const [loadingTables, setLoadingTables] = useState(true); // Estado de carregamento para as tabelas
  const { session, status } = useAuth(); // Use o hook personalizado

  useEffect(() => {
    if (status === 'authenticated') {

      const fetchTables = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/v1/fetch-data/tables', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${(session as any)?.accessToken}`,
            },
          });
          if (!response.ok) {
            throw new Error('Erro ao buscar tabelas');
          }
          const data = await response.json();
          console.log('Dados das tabelas:', data); // Log para verificar os dados retornados
          setTables(data.tables || []);
        } catch (error) {
          console.error('Erro ao buscar tabelas:', error);
          setTables([]); // Garantir que tables seja um array vazio em caso de erro
        } finally {
          setLoadingTables(false); // Dados carregados, definir loadingTables como false
        }
      };

      fetchTables();
    }
    console.log('tables:', tables); // Log para verificar o estado das tabelas
  }, [status]);

  const fetchData = async () => {
    if (!table) {
      setError('O nome da tabela é obrigatório.');
      return;
    }

    setLoading(true);
    setError('');

    const queryParams = new URLSearchParams({
      file_key: table, // Alterado para usar 'file_key' em vez de 'table'
      year_filter: filters || ''
    });

    try {
      const response = await fetch(`http://localhost:8000/api/v1/fetch-data/?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }
      const result: DataResponse = await response.json();

      // Transformar os dados para o formato esperado pelo DataTable
      const tableData = result.data.map(row => {
        const rowData: TableData = {};
        result.columns.forEach((col, index) => {
          rowData[col] = row[index];
        });
        return rowData;
      });

      setData(tableData);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Definir as colunas para o DataTable
  const columnDefs: ColumnDef<TableData, any>[] = data.length > 0 ? Object.keys(data[0]).map(key => ({
    accessorKey: key,
    header: key,
  })) : [];

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null; // Ou uma mensagem de carregamento enquanto redireciona
  }

  return (
    <main className='flex flex-col items-center justify-center sm:ml-14 p-4'>
      <h1 className='p-5 text-2xl font-bold'>Conexão com Data Lake</h1>
      <div className='p-10 grid grid-cols2 gap-5'>
        <Card className='flex flex-col justify-between'>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                Buscar de dados no Data Lake
              </CardTitle>
            </div>
            <CardDescription>
              Insira as condições abaixo para buscar na base de dados.
            </CardDescription>
          </CardHeader>
          <CardContent className='text-base sm:text-lg font-bold mt-auto'>
            <Label htmlFor='Tabela'>Tabela</Label>
            {loadingTables ? (
              <p>Carregando tabelas...</p>
            ) : (
              <Select onValueChange={setTable}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Selecione uma tabela" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tabelas</SelectLabel>
                    {tables.length > 0 ? (
                      tables.map(table => (
                        <SelectItem key={table} value={table}>{table}</SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>Nenhuma tabela disponível</SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <Label htmlFor='Filtro'>Período em Ano:</Label>
            <Select onValueChange={(value) => setFilters(value === 'todos' ? null : value)}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder="Selecione um período" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Período</SelectLabel>
                  <SelectItem value="todos">Todos</SelectItem>
                  {Array.from({ length: 2023 - 1970 + 1 }, (_, i) => 1970 + i).map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className='mt-2 w-full p-2 rounded'
              onClick={fetchData} disabled={loading}>
              {loading ? 'Carregando...' : 'Buscar Dados'}
            </Button>
          </CardContent>
        </Card>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="container mx-auto py-10">
        {data.length > 0 ? (
          <DataTable columns={columnDefs} data={data} />
        ) : (
          <p>Nenhum dado disponível</p>
        )}
      </div>
    </main>
  );
}