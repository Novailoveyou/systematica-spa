export type Data = {
  /** @example {} */
  filters: unknown
  /** @example '' */
  message: string
  /** @example 0 */
  status: number
  /** @example null */
  validDate: unknown
  response: {
    /** @example 'Краснопрудная улица, дом 1' */
    Address: string
    /** @example 'Центральный административный округ' */
    AdmArea: string
    /** @example 10 */
    Capacity: number
    /** @example 'Департамент транспорта и развития дорожно-транспортной инфраструктуры города Москвы' */
    DepartmentalAffiliation: string
    /** @example 'Красносельский район' */
    District: string
    /** @example 3282 */
    ID: number
    /** @example '55.776772' */
    Latitude_WGS84: string
    /** @example '37.659090' */
    Longitude_WGS84: string
    /** @example 'Велосипедная парковка № 110136014419' */
    Name: string
    /** @example 'ГКУ Центр организации дорожного движения Правительства Москвы' */
    ObjectOperOrgName: string
    ObjectOperOrgPhone: {
      /** @example '(495) 361-78-07'  */
      OperationOrganizationPhone: string
      /** @example 6269  */
      global_id: number
      /** @example 0  */
      is_deleted: number
    }[]
    /** @example '6406ac11-b399-4169-ad19-18cd35a84c82' */
    Photo: string
    geoData: {
      /** @example [37.65909, 55.776772]  */
      coordinates: [number, number]
      /** @example 'Point'  */
      type: 'Point'
    }
    geodata_center: {
      /** @example [37.65909, 55.776772]  */
      coordinates: [number, number]
      /** @example 'Point'  */
      type: string
    }
    /** @example 2609506536 */
    global_id: number
    /** @example 0 */
    is_deleted: number
  }[]
}
