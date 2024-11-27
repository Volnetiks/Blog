interface WhatIDoProps {
  activityName: string;
  activityDescription: string;
  icon: JSX.Element;
}

export default function Expertise({ activityName, activityDescription, icon }: WhatIDoProps) {
  return (
    <div className={'min-w-full rounded-2xl bg-gray-100 flex flex-row p-2 pr-6 pl-6 gap-6 items-center'}>
      {icon}
      <div className={'flex flex-col justify-between gap-2 py-2'}>
        <p className={'text-xl font-semibold'}>
          {activityName}
        </p>
        <p>
          {activityDescription}
        </p>
      </div>
    </div>
  );
}