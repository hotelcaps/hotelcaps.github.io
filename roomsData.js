import { ref } from 'vue';

// This is the single source of truth for all room information.
// To add, remove, or edit a room, you only need to change this file.
export const roomsData = ref([
  {
    id: 'standard',
    name: 'Standard Room',
    price: 2500,
    description: 'Offers everything you need for a relaxing and comfortable short visit.',
    features: [
      'Cozy accommodations',
      'Complimentary breakfast',
      'Free Wi-Fi',
    ],
    galleryImages: [
      '/images/rooms/standard/1.jpg',
    ]
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    price: 2800,
    description: 'A more spacious and elegantly appointed room with enhanced amenities.',
    features: [
      'Expansive living area',
      'Premium bath amenities',
      'Ample natural light & ventilation',
    ],
    galleryImages: [
      '/images/rooms/deluxe/1.jpg',
      '/images/rooms/deluxe/2.jpg',
      '/images/rooms/deluxe/3.jpg',
    ]
  },
  {
    id: 'suite',
    name: 'Suite Room',
    price: 3500,
    description: 'The pinnacle of luxury, offering a separate living area and exclusive services.',
    features: [
      'Open Balcony View',
      'Spacious and Airy',
      'Expansive living area',
    ],
    galleryImages: [
      '/images/rooms/suite/1.jpg',
      '/images/rooms/suite/2.jpg',
      '/images/rooms/suite/3.jpg',
      '/images/rooms/suite/4.jpg',
      '/images/rooms/suite/5.jpg',
    ]
  }
]);

export const extraCharges = {
  extraBed: 700,
  extraPerson: 500,
};
