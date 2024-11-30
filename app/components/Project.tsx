import { Button, Card, CardBody, Image, Link } from '@nextui-org/react';
import { ExternalLinkIcon } from 'lucide-react';
import ProjectInterface from '~/interfaces/Project';

interface ProjectProps {
  project: ProjectInterface;
}

export default function Project({ project }: ProjectProps) {
  return (
    <Link className={'w-4/5 lg:w-1/4 mx-1 h-[600px] lg:h-[400px] lg:mt-16'}>
      <Card
        className="bg-white w-full h-full"
        shadow="sm"
      >
        <CardBody className="p-0 h-full w-full flex flex-col box-border">
          <div className={'h-2/3 lg:h-1/2 w-full relative'}>
            <Image
              removeWrapper={true}
              alt="Article cover"
              classNames={{
                wrapper: 'w-full h-full overflow-hidden',
                img: 'w-full h-full object-cover object-center'
              }}
              radius="none"
              shadow="md"
              src={project.image}
            />
          </div>

          <div className="flex flex-col px-6 py-2 h-2/3 overflow-hidden justify-between">
            <div className="overflow-hidden flex flex-col">
              <div className={'flex flex-row justify-between items-end'}>
                <h1 className="text-2xl font-bold mt-4">
                  {project.name}
                </h1>
                <Button as={Link} isDisabled={project.workInProgress} href={project.url} className={'bg-white'}>
                  <ExternalLinkIcon />
                </Button>

              </div>
              <div className="mt-2 flex-grow overflow-x-auto">
                <p className="break-words">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}