export interface IFirstStep {
  sampleTextProp: string;
}

const FirstStep: React.FC<IFirstStep> = ({ sampleTextProp }) => {
  return (
    <div>
      <h1>FirstStep</h1>
      {sampleTextProp}
    </div>
  );
};

export default FirstStep;
