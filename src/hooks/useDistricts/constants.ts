const DATASET_SIZE = 1155
const LIMIT = 100

const BODY = {
  id: 403,
  offset: DATASET_SIZE - LIMIT, // Исправлено для соответствия требованию 1: ...получить данные о 100 ПОСЛЕДНИХ записях, используя тело запроса... Размер массива объектов (DATASET_SIZE) получен здесь: https://data.mos.ru/opendata/7704786030-veloparkovki
  limit: LIMIT,
  criteria: '',
  fetchGeodata: true,
  epoch: '2024-10-03 12:14:40',
  timestamp: 1,
} as const

export const ROUTE = '/ehdapi/catalog/get'

export const PARAMS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'ehd-system': 'opod',
  },
  body: JSON.stringify(BODY),
} as const
