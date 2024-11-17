import MainArticle from '~/components/MainArticle';
import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Article from '~/components/Article';

export default function Index() {
  return (
    <div>
      <Navbar maxWidth="full">
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarItem>
            <p className="font-bold text-inherit">Volnetiks</p>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              About
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Blog
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Projects
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main>
        <div className={'flex flex-col'}>
          <div className={'flex-row flex justify-around'}>
            <MainArticle />
            <Article />
          </div>
          <div className={'mt-8 flex-row flex justify-around'}>
            <Article />
            <Article />
            <Article />
            <Article />
          </div>
        </div>
      </main>
    </div>
  );
}