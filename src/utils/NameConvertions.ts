import { startCase } from 'lodash'

export const nameToAssetId = (name: string): string => {
  return name.toLowerCase().split(' ').join('-').replace(/[^0-9a-z-]/gi, '')
}

export const mapAssetIdToSuiteName = (assetId: string): string => {
  const s = assetId.split('-').join(' ').replace(/ {3}/g, ' - ')
  return startCase(s)
}
