import {
  Button,
  Link,
  NavbarContent,
  NavbarItem,
  Navbar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

interface HeaderProps {
  activatedIndex: number;
}

export default function Header({ activatedIndex }: HeaderProps) {
  const [time, setTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Paris',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });

  return (
    <Navbar maxWidth="full"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}>

      <NavbarContent className={'sm:hidden justify-start'} justify="start">
        <NavbarMenuToggle />
        <NavbarItem>
          <Link className={'text-black'} href={'/'}>
            <p className="font-bold text-inherit">Thomas Béchu</p>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <Link className={'text-black'} href={'/'}>
            <p className="font-bold text-inherit">Thomas Béchu</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={'/'}>
            <p className={`${activatedIndex == 0 ? 'text-blue-800 font-semibold' : 'text-black'}`}>About</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={'/blog'}>
            <p className={`${activatedIndex == 1 ? 'text-blue-800 font-semibold' : 'text-black'}`}>Blog</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={'/teamwork'}>
            <p className={`${activatedIndex == 4 ? 'text-blue-800 font-semibold' : 'text-black'}`}>Team Works</p>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <div className={'flex flex-col gap-0 m-0'}>
            <p>
              {formatter.format(time)}
            </p>
            <p className="text-gray-400">Paris, France</p>
          </div>
        </NavbarItem>
        <NavbarItem>
          <Button href={'/contact'} as={Link}>
            Contact me
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link href={'/'}>
            <p className={`${activatedIndex == 0 ? 'text-blue-800 font-semibold' : 'text-black'}`}>About</p>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={'/blog'}>
            <p className={`${activatedIndex == 1 ? 'text-blue-800 font-semibold' : 'text-black'}`}>Blog</p>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={'/teamwork'}>
            <p className={`${activatedIndex == 4 ? 'text-blue-800 font-semibold' : 'text-black'}`}>Team Works</p>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={'/contact'}>
            <p className={`${activatedIndex == 3 ? 'text-blue-800 font-semibold' : 'text-black'}`}>Contact Me</p>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}