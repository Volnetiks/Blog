import Header from '~/components/Navbar';
import Project from '~/components/Project';
import Footer from '~/components/Footer';
import { Divider } from '@nextui-org/react';

export default function Projects() {
  return (
    <div className={'w-full h-full'}>
      <title>Thomas Béchu | Projects</title>
      <Header activatedIndex={2} />
      <div className={'flex flex-col justify-between h-full'}>
        <div className={'flex flex-col lg:flex-row lg:justify-around gap-y-16 pt-6 items-center'}>
          <Project image={'https://nextui.org/images/album-cover.png'} name={'Blog - Portfolio'}
                   workInProgress={false}
                   description={'A combined portfolio and blog platform that lets me share my work, thoughts, and knowledge in one creative space.'} />
          <Project image={'https://nextui.org/images/album-cover.png'} name={'AI Companion'} workInProgress={true}
                   description={'An evolving AI platform designed to let you interact with personalized chatbots, helping you maximize the potential of your ideas.'} />
          <Project image={'https://nextui.org/images/album-cover.png'} name={'Blog - Portfolio'}
                   workInProgress={false}
                   description={'A combined portfolio and blog platform that lets me share my work, thoughts, and knowledge in one creative space.'} />
        </div>
        <div className={'flex flex-col lg:flex-row lg:justify-around gap-y-16 pt-6 items-center'}>
          <Project image={'https://nextui.org/images/album-cover.png'} name={'Blog - Portfolio'}
                   workInProgress={false}
                   description={'A combined portfolio and blog platform that lets me share my work, thoughts, and knowledge in one creative space.'} />
          <Project image={'https://nextui.org/images/album-cover.png'} name={'AI Companion'} workInProgress={true}
                   description={'An evolving AI platform designed to let you interact with personalized chatbots, helping you maximize the potential of your ideas.'} />
          <Project image={'https://nextui.org/images/album-cover.png'} name={'Blog - Portfolio'}
                   workInProgress={false}
                   description={'A combined portfolio and blog platform that lets me share my work, thoughts, and knowledge in one creative space.'} />
        </div>
        <div className={'mt-12'}>
          <Divider />
          <Footer />
        </div>
      </div>
    </div>
  );
}