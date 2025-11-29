import { Spring } from '@/models/types/spring';

export const getImage = (spring: Spring, index?: number) => {
  return spring?.images?.length > 0
    ? `/springImages/${spring.images[index || 0].image}`
    : '/water_texture.jpg';
};
