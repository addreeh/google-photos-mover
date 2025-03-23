export class PhotosAPI {
  private accessToken: string;
  private baseUrl = 'https://photoslibrary.googleapis.com/v1';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    return response.json();
  }

  // Get all photos by handling pagination automatically
  async getAllPhotos(pageSize = 100) {
    let allPhotos = [];
    let nextPageToken = null;
    
    do {
      const response = await this.getPhotos(pageSize, nextPageToken);
      
      if (response.mediaItems) {
        allPhotos = [...allPhotos, ...response.mediaItems];
      }
      
      nextPageToken = response.nextPageToken;
    } while (nextPageToken);
    
    return { mediaItems: allPhotos };
  }

  // Original method for single page
  async getPhotos(pageSize = 25, pageToken?: string) {
    const params = new URLSearchParams();
    params.append('pageSize', pageSize.toString());
    if (pageToken) {
      params.append('pageToken', pageToken);
    }

    return this.fetchWithAuth(`/mediaItems?${params.toString()}`);
  }

  // Get all albums with pagination handling
  async getAllAlbums(pageSize = 50) {
    let allAlbums = [];
    let nextPageToken = null;
    
    do {
      const response = await this.getAlbums(pageSize, nextPageToken);
      
      if (response.albums) {
        allAlbums = [...allAlbums, ...response.albums];
      }
      
      nextPageToken = response.nextPageToken;
    } while (nextPageToken);
    
    return { albums: allAlbums };
  }

  async getAlbums(pageSize = 25, pageToken?: string) {
    const params = new URLSearchParams();
    params.append('pageSize', pageSize.toString());
    if (pageToken) {
      params.append('pageToken', pageToken);
    }

    return this.fetchWithAuth(`/albums?${params.toString()}`);
  }

  async getAlbumContents(albumId: string, pageSize = 25, pageToken?: string) {
    const body = {
      albumId,
      pageSize,
      pageToken
    };

    return this.fetchWithAuth('/mediaItems:search', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  // Get all media items in an album with pagination handling
  async getAllAlbumContents(albumId: string, pageSize = 100) {
    let allMediaItems = [];
    let nextPageToken = null;
    
    do {
      const response = await this.getAlbumContents(albumId, pageSize, nextPageToken);
      
      if (response.mediaItems) {
        allMediaItems = [...allMediaItems, ...response.mediaItems];
      }
      
      nextPageToken = response.nextPageToken;
    } while (nextPageToken);
    
    return { mediaItems: allMediaItems };
  }

  async createAlbum(title: string) {
    const body = {
      album: { title }
    };

    return this.fetchWithAuth('/albums', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  async addMediaItems(albumId: string, mediaItemIds: string[]) {
    const body = {
      mediaItemIds
    };

    return this.fetchWithAuth(`/albums/${albumId}:batchAddMediaItems`, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }
}