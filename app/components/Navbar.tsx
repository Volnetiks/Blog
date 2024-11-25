import { Button, Link, NavbarContent, NavbarItem, Navbar } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

interface HeaderProps {
  activatedIndex: number;
}

export default function Header({ activatedIndex }: HeaderProps) {
  const [time, setTime] = useState(new Date());

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
    <Navbar maxWidth="full">
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <p className="font-bold text-inherit">Thomas Béchu</p>
        </NavbarItem>
        <NavbarItem className={`${activatedIndex == 0 ? 'text-blue-800 font-semibold' : 'text-black'}`}>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
        <NavbarItem className={`${activatedIndex == 1 ? 'text-blue-800 font-semibold' : 'text-black'}`}>
          Blog
        </NavbarItem>
        <NavbarItem className={`${activatedIndex == 2 ? 'text-blue-800 font-semibold' : 'text-black'}`}>
          Projects
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
          <Button>
            Contact me
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}