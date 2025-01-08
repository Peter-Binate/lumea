interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <ul className="steps w-full steps-vertical lg:steps-horizontal">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <li
          key={index}
          className={`step ${index + 1 <= currentStep ? 'step-primary' : ''}`}
        ></li>
      ))}
    </ul>
  );
};

export default ProgressBar;
