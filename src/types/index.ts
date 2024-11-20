import { useDistricts } from '../hooks'

export type District = { district: string; capacity: number }

export type DistrictsProps = Pick<ReturnType<typeof useDistricts>, 'districts'>