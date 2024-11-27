import Header from '~/components/Navbar';
import { Button, Divider, Image, Link } from '@nextui-org/react';
import React from 'react';
import WorkingExperience from '~/components/WorkingExperience';
import Expertise from '~/components/Expertise';
import { Building2Icon, SmartphoneIcon } from 'lucide-react';
import Footer from '~/components/Footer';

export default function Index() {
  return (<div>
    <title>Thomas Béchu</title>
    <Header activatedIndex={0} />
    <div className={'flex w-full items-center lg:items-start flex-col lg:flex-row lg:justify-evenly mt-20 mb-16'}>
      <div className={'flex flex-col text-center items-center lg:text-left gap-2 lg:max-w-[35%] max-w-[80%] mb-8'}>
        <Image width={200} src={'/me.jpg'} />
        <p className={'font-bold text-6xl mt-4'}>I'm Thomas Béchu</p>
        <p className={'text-2xl'}>AI and Mobile programmer based in Nantes, France</p>
      </div>
      <div className={'flex flex-col max-w-[80%] lg:max-w-[35%] gap-4'}>
        <div className={'flex flex-col gap-8'}>
          <p className={'text-4xl text-center lg:text-left break-words'}>Passionate crafting products around new
            technologies.</p>
          <div className={'flex flex-row gap-4 mb-6 justify-center lg:justify-start'}>
            <Button className={'bg-black text-white'} href={'/contact'} as={Link}>
              Contact me
            </Button>
            <Button className={'bg-white border-1 border-gray-300 text-black'} href={'/projects'} as={Link}>
              See my work
            </Button>
          </div>
        </div>
        <Divider />
        <div className={'flex flex-col gap-6 mb-12'}>
          <p className={'text-large font-medium'}>Working Experience</p>
          <WorkingExperience companyName={'D-EDGE'} postName={'DevOps Engineer Intern'} duration={'January 2023'}
                             icon={'/dedge.png'} />
          <WorkingExperience companyName={'Thomas Béchu\'s Corp.'} postName={'Self Employed Programmer'}
                             duration={'Sep. 2024 - Present'} icon={''} />
        </div>
        <Divider />
        <div className={'flex flex-col gap-6'}>
          <p className={'text-large font-medium'}>Areas of expertise</p>
          <Expertise
            activityDescription={'Creating Artificial Intelligence tools that matches your needs, for your company. I specialize in chatbot, fitting the model to your needs.'}
            activityName={'Artificial Intelligence Software'}
            icon={<Building2Icon size={80} />}
          />
          <Expertise
            activityDescription={'Creating mobile apps for your start-up/company. I create simple, yet good looking and efficient apps to fit your needs.'}
            activityName={'Mobile apps development'}
            icon={<SmartphoneIcon size={80} />}
          />
        </div>
      </div>
    </div>
    <Divider />
    <Footer />
  </div>);
}