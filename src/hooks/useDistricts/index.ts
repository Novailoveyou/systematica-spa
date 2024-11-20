import { useState, useEffect } from 'react'
import { Data } from './types'
import { PARAMS, ROUTE } from './constants'
import { District } from '../../types'

const useDistricts = () => {
  const [districts, setDistricts] = useState<District[]>([])
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

        const data: Data = await response.json()

        const _districts: typeof districts = Object.values(
          data.response.reduce(
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
            {} as Record<string, typeof districts[number]>,
          ),
        )

        setDistricts(_districts)
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

  return { districts, loading, error }
}

export default useDistricts
