// Centralized category-specific images for the entire application
export const CATEGORY_IMAGES = {
  education: '/group-children-lying-reading-grass-field.jpg',
  healthcare: '/stethoscope-lying-medical-form-clipboard.jpg',
  water: '/men-women-help-each-other-collect-garbage.jpg',
  food: '/close-up-volunteers-collecting-food.jpg',
  default: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop'
};

export const getCategoryImage = (category: string): string => {
  return CATEGORY_IMAGES[category as keyof typeof CATEGORY_IMAGES] || CATEGORY_IMAGES.default;
};