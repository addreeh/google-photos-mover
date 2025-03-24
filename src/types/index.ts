export interface Album {
  id: string
  title: string
  coverPhotoBaseUrl?: string
  mediaItemsCount?: number
}

export interface Photo {
  baseUrl: string
  filename: string
  id: string
}
