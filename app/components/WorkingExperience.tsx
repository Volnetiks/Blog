import { Avatar } from '@nextui-org/react';
import { Building2Icon } from 'lucide-react';

interface WorkingExperienceProps {
  postName: string;
  companyName: string;
  duration: string;
  icon: string;
}

export default function WorkingExperience({ postName, companyName, duration, icon }: WorkingExperienceProps) {
  return (
    <div className={'flex flex-row bg-gray-100 border-1 border-gray-300 min-w-full rounded-[80px]'}>
      <div className={'m-2 p-2 flex flex-row w-full gap-4 items-center justify-between'}>
        <div className={'flex flex-row gap-4 items-center'}>
          {icon === '' ? <Building2Icon size={48} /> : <Avatar src={icon} className={'w-14 h-14'} />}
          <div className={'flex flex-col justify-between'}>
            <p className={'text-medium'}>
              {postName}
            </p>
            <p className={'text-xl font-bold'}>
              {companyName}
            </p>
          </div>
        </div>
        <div className={'mr-4 text-gray-500 text-sm hidden sm:flex'}>
          <p>
            {duration}
          </p>
        </div>
      </div>
    </div>
  );
}