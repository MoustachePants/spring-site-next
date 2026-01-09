import { Spring } from '@/models/types/spring';

export const getSpringImage = (spring: Spring, index?: number) => {
  const baseImagesURL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;

  return spring?.images?.length > 0
    ? `${baseImagesURL}/${spring.images[index || 0].image}`
    : '/water_texture.jpg';
};
