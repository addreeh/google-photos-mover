// Archivo: src/mocks/mockData.js

// Función para generar un color aleatorio en formato hexadecimal
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  // Crear un array de 30 fotos de prueba con variedad en nombres y URLs
  export const mockPhotos = Array(30).fill().map((_, index) => {
    const fileTypes = ['.jpg', '.png', '.jpeg', '.heic', '.webp'];
    const prefixes = ['IMG_', 'DCIM_', 'Photo_', 'Vacation_', 'Family_', 'Party_', 'Travel_', 'Screenshot_', 'Portrait_', ''];
    const themes = ['beach', 'mountain', 'family', 'pet', 'food', 'travel', 'selfie', 'landscape', 'architecture', 'nature'];
    const dates = ['20240315', '20240212', '20231125', '20231007', '20230823', '20230614', '20230502', '20230401', '20230228', '20230101'];
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const date = dates[Math.floor(Math.random() * dates.length)];
    const type = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    
    // Generar diferentes longitudes de nombre
    const filename = `${prefix}${date}_${theme}${Math.random() > 0.7 ? '_edited' : ''}${Math.random() > 0.8 ? '_final_version' : ''}${type}`;
    
    // Generar diferentes URLs de placeholder con colores aleatorios
    const colorCode = getRandomColor().substring(1);
    const width = 400;
    const height = 400;
    
    return {
      id: `photo-${index}`,
      baseUrl: `https://placehold.co/${width}x${height}/${colorCode}/FFFFFF`,
      filename,
      mediaMetadata: {
        creationTime: new Date(date.substring(0, 4), parseInt(date.substring(4, 6)) - 1, date.substring(6, 8)).toISOString(),
        width,
        height,
      },
      mimeType: type === '.png' ? 'image/png' : type === '.webp' ? 'image/webp' : 'image/jpeg',
    };
  });
  
  // Crear un array de 10 álbumes de prueba con variedad en nombres y contenido
  export const mockAlbums = [
    {
      id: 'album-1',
      title: 'Vacaciones 2023',
      coverPhotoBaseUrl: 'https://placehold.co/400x400/0047AB/FFFFFF',
      mediaItemsCount: 24,
      coverPhotoMediaItemId: 'photo-1'
    },
    {
      id: 'album-2',
      title: 'Cumpleaños de Sofía',
      coverPhotoBaseUrl: 'https://placehold.co/400x400/8B0000/FFFFFF',
      mediaItemsCount: 12,
      coverPhotoMediaItemId: 'photo-5'
    },
    {
      id: 'album-3',
      title: 'Viaje a Barcelona',
      coverPhotoBaseUrl: 'https://placehold.co/400x400/006400/FFFFFF',
      mediaItemsCount: 35,
      coverPhotoMediaItemId: 'photo-8'
    },
    {
      id: 'album-4',
      title: 'Boda de Juan y María',
      coverPhotoBaseUrl: 'https://placehold.co/400x400/4B0082/FFFFFF',
      mediaItemsCount: 86,
      coverPhotoMediaItemId: 'photo-12'
    },
    {
      id: 'album-5',
      title: 'Mascotas',
      coverPhotoBaseUrl: 'https://placehold.co/400x400/FF8C00/FFFFFF',
      mediaItemsCount: 15,
      coverPhotoMediaItemId: 'photo-15'
    },
    {
      id: 'album-6',
      title: 'Capturas de pantalla',
      coverPhotoBaseUrl: 'https://placehold.co/400x400/2F4F4F/FFFFFF',
      mediaItemsCount: 7,
      coverPhotoMediaItemId: 'photo-18'
    },
    {
      id: 'album-7',
      title: 'Recetas favoritas',
      coverPhotoBaseUrl: 'https://placehold.co/400x400/800000/FFFFFF',
      mediaItemsCount: 9,
      coverPhotoMediaItemId: 'photo-22'
    },
    {
      id: 'album-8',
      title: 'Proyecto de trabajo',
      coverPhotoBaseUrl: 'https://placehold.co/400x400/000080/FFFFFF',
      mediaItemsCount: 42,
      coverPhotoMediaItemId: 'photo-25'
    },
    {
      id: 'album-9',
      title: 'Naturaleza',
      coverPhotoBaseUrl: 'https://placehold.co/400x400/556B2F/FFFFFF',
      mediaItemsCount: 18,
      coverPhotoMediaItemId: 'photo-28'
    },
    {
      id: 'album-10',
      title: 'Mis favoritas',
      coverPhotoBaseUrl: 'https://placehold.co/400x400/8B008B/FFFFFF',
      mediaItemsCount: 30,
      coverPhotoMediaItemId: 'photo-29'
    }
  ];