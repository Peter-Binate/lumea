import { IFoodCard } from './FoodCard';

const base: IFoodCard = {
  tag: 'Légume',
  title: `Appeeling Spuds!`,
  body: "Notre pomme de terre n'est pas une patate douce, mais elle est bien dans sa peau!",
  author: 'Quentin',
  time: '1h ago',
};

export const mockFoodCardProps = {
  base,
};
