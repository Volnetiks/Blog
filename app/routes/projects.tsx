import Header from '~/components/Navbar';
import Project from '~/components/Project';
import Footer from '~/components/Footer';
import { Divider } from '@nextui-org/react';
import { supabase } from '~/database/database';
import ProjectInterface from '~/interfaces/Project';
import { useLoaderData } from '@remix-run/react';

export const loader = async () => {
  const data = await supabase.getAllProjects();
  const projects: ProjectInterface[] = [];

  data.forEach((dataItem) => {
    const project: ProjectInterface = {
      name: dataItem.name,
      image: dataItem.image,
      url: dataItem.url,
      workInProgress: dataItem.workInProgress,
      description: dataItem.description
    };

    projects.push(project);
  });

  return projects;
};

export default function Projects() {
  const projects = useLoaderData<typeof loader>();

  return (
    <div className={'w-full h-full'}>
      <title>Thomas Béchu | Projects</title>
      <Header activatedIndex={2} />
      <div className={'flex flex-col justify-between h-full'}>
        <div className={'flex flex-col lg:flex-row lg:justify-around gap-y-16 pt-6 items-center lg:flex-wrap'}>
          {projects.map((project: ProjectInterface) => {
              return (<Project project={project} />);
            }
          )}
        </div>
        <div className={'mt-12'}>
          <Divider />
          <Footer />
        </div>
      </div>
    </div>
  );
}