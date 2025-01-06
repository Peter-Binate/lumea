export interface ILastStep {
  sampleTextProp: string;
}

const LastStep: React.FC<ILastStep> = ({ sampleTextProp }) => {
  return (
    <div>
      <h1>LastStep</h1>
    </div>
  );
};

export default LastStep;
