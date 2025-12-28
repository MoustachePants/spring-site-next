import { Category } from '@/models/types/category';
import { Spring } from '@/models/types/spring';

/**
 * Checks if a spring matches a specific category criteria.
 * @param spring The spring to check
 * @param category The category to filter by
 * @returns true if the spring matches the category, false otherwise
 */
export const checkSpringByCategory = (spring: Spring, category: Category): boolean => {
  switch (category) {
    case 'deep':
      return spring.springDetails.isDeep;
    case 'hot':
      return spring.springDetails.isHotSpring;
    case 'accsessible':
      return spring.springDetails.IsAccessible;
    case 'shadow':
      return spring.springDetails.hasShadow;
    case 'view':
      return spring.springDetails.hasView;
    case 'nearCar':
      // Assuming near car means <= 10 minutes walk
      return spring.location.minutesByFoot <= 10;
    case 'sitSpot':
      return spring.springDetails.hasSitingSpots;
    case 'shallow':
      return spring.springDetails.isShallow;
    default:
      return true;
  }
};
