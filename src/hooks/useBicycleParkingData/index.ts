import { useState, useEffect } from 'react'
import { Catalog } from './types'
import { PARAMS, ROUTE } from './constants'

const useBicycleParkingData = () => {
  const [data, setData] = useState<{ district: string; capacity: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(ROUTE, PARAMS)

        if (!response.ok)
          throw new Error(`An error occured: ${response.status}`)

        const catalog: Catalog = await response.json()

        const normalized: typeof data = Object.values(
          catalog.response.reduce(
            (acc, { District: district, Capacity: capacity }) => {
              if (acc[district]) {
                acc[district].capacity += capacity
              } else {
                acc[district] = {
                  capacity,
                  district,
                }
              }
              return acc
            },
            {} as Record<string, typeof data[number]>,
          ),
        )

        setData(normalized)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { districtData: data, loading, error }
}

export type DistrictDataProps = Pick<ReturnType<typeof useBicycleParkingData>, 'districtData'>
export type DistrictDataItem = DistrictDataProps['districtData'][number]

export default useBicycleParkingData
