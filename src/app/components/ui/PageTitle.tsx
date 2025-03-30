type PageTitleProps = {
  title: string;
  emoji?: string;
};

export const PageTitle = ({ title, emoji }: PageTitleProps) => {
  return (
    <>
      <div className="mt-10 sm:mt-8 mb-8 flex items-center gap-3">
        {emoji && <span className="text-2xl">{emoji}</span>}
        <h1 className="text-slate-900 text-[28px] font-semibold">{title}</h1>
      </div>
    </>
  );
};
