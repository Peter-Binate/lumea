import styles from '@/app/page.module.css';
import MultiStepForm from './components/forms/MultiStepForm/MultiStepForm';

export default function Home() {
  return (
    <section className={styles.main}>
      <h1 className={styles.title}>Bienvenue !</h1>
      <MultiStepForm />
      {/* <Step1 {...mockStep1Props.base} /> */}
    </section>
  );
}
