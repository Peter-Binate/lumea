import React from 'react';

type PageTitleProps = {
    title: string;
    emoji?: string;
}

export const PageTitle = ({ title, emoji }: PageTitleProps ) => {
    return (
        <>
            <div className="my-8 flex items-center gap-3">
                {emoji && <span className="text-2xl">{emoji}</span>}
                <h1 className="text-slate-900 text-[28px] font-semibold">
                    {title}
                </h1>
            </div>
        </>
    )
}