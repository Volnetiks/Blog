import { CopyrightIcon } from 'lucide-react';
import { Link } from '@nextui-org/react';

export default function Footer() {
  return (<div className={'flex flex-row justify-between items-center py-6 px-12'}>
    <div className={'flex flex-row gap-2'}>
      <CopyrightIcon size={20} />
      <p className={'text-small text-gray-500'}>2024-present Thomas Béchu. All Rights Reserved</p>
    </div>
    <div className={'flex flex-col sm:flex-row gap-1 ml-5 sm:ml-0'}>
      <Link href={'https://www.linkedin.com/in/bechu-thomas/'}>
        <p className={'text-gray-700'}>LinkedIn</p>
      </Link>
      <p className={'text-gray-500 hidden sm:flex'}>/</p>
      <Link href={'https://github.com/Volnetiks'}>
        <p className={'text-gray-700'}>GitHub</p>
      </Link>
    </div>
  </div>);
}