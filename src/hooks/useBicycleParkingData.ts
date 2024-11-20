import { useState, useEffect } from 'react';
import { DistrictCapacity } from '../types';

const DATASET_SIZE = 1155;
const LIMIT = 100;

const requestBody = {
  id: 403,
  offset: DATASET_SIZE - LIMIT, // Исправлено для соответствия требованию 1: ...получить данные о 100 ПОСЛЕДНИХ записях, используя тело запроса... Размер массива объектов (DATASET_SIZE) получен здесь: https://data.mos.ru/opendata/7704786030-veloparkovki
  limit: LIMIT,
  criteria: '',
  fetchGeodata: true,
  epoch: '2024-10-03 12:14:40',
  timestamp: 1
};

const requestUrl = '/ehdapi/catalog/get';

const requestParams = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'ehd-system': 'opod'
  },
  body: JSON.stringify(requestBody)
};

const useBicycleParkingData = (): {
  districtData: DistrictCapacity[] | null;
  loading: boolean;
  error: string | null;
} => {
  const [data, setData] = useState<DistrictCapacity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(requestUrl, requestParams);
        if (!response.ok) {
          throw new Error(`An error occured: ${response.status}`);
        }
        const result = (await response.json()).response;
        const normalized: DistrictCapacity[] = Object.values(
          result
            .map(
              ({
                District,
                Capacity
              }: {
                District: string;
                Capacity: number;
              }) => ({
                district: District,
                capacity: Capacity
              })
            )
            .reduce(
              (
                acc: { [key: string]: DistrictCapacity },
                cur: DistrictCapacity
              ) => {
                if (acc[cur.district]) {
                  acc[cur.district].capacity += cur.capacity;
                } else {
                  acc[cur.district] = { ...cur };
                }
                return acc;
              },
              {}
            )
        );
        setData(normalized);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { districtData: data, loading, error };
};

export default useBicycleParkingData;
