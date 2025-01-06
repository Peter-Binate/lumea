export interface ISecondStep {
  sampleTextProp: string;
}

const SecondStep: React.FC<ISecondStep> = ({ sampleTextProp }) => {
  return (
    <div>
      <h1>SecondStep</h1>
    </div>
  );
};

export default SecondStep;
