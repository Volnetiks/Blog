import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { BrainCircuit } from 'lucide-react';

export default function Article() {
  return (
    <Card
      className="border-none bg-white dark:bg-default-100/50 w-1/6 h-[600px] p-0 m-0"
      shadow="sm"
    >
      <CardBody className="overflow-hidden p-0 m-0">
        <Image
          alt="Album cover"
          className="object-cover"
          height={200}
          width={325}
          src="https://nextui.org/images/album-cover.png"
          radius="none"
          shadow="md"
        />

        <div className="flex flex-col col-span-6 md:col-span-8 m-6 h-full">
          <Button variant="bordered" className="w-min text-black border-black">
            <BrainCircuit /> Artificial Intelligence
          </Button>
          <div className="flex flex-col justify-between h-full max-h-full overflow-hidden">
            <div className="flex flex-col gap-4 mt-3 text-black h-full overflow-auto">
              <p className={'font-semibold'}>
                How to use word vectoring for your projects.
              </p>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum felis, vel
                vestibulum diam mattis sit amet. Aliquam commodo id metus auctor mattis.
              </p>
            </div>
            <p>
              Nov 17, 2024
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}