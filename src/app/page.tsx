import FoodCard from '@/app/components/cards/food/FoodCard';
import { mockFoodCardProps } from '@/app/components/cards/food/FoodCard.mocks';
import styles from '@/app/page.module.css';

export default function Home() {
  return (
    <section className={styles.main}>
      <h1 className={styles.title}>Bienvenue !</h1>
      <FoodCard {...mockFoodCardProps.base} />
    </section>
  );
}
