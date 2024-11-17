import { Button, Card, CardBody, Image } from '@nextui-org/react';
import { BrainCircuit } from 'lucide-react';

export default function MainArticle() {
  return (
    <div className="w-4/6 h-[600px]">
      <Card
        className="border-none bg-black dark:bg-default-100/50 w-full h-full p-0"
        shadow="sm"
      >
        <CardBody className="p-0 h-full">
          <div className="grid grid-cols-12 gap-6 h-full">
            <div className="relative col-span-12 md:col-span-5">
              <Image
                alt="Album cover"
                classNames={{
                  wrapper: 'w-full h-full',
                  img: 'w-full h-full object-cover'
                }}
                radius="none"
                shadow="md"
                src="https://nextui.org/images/album-cover.png"
              />
            </div>

            <div
              className="flex flex-col col-span-12 md:col-span-7 px-6 h-full max-h-full overflow-hidden justify-between">
              <Button variant="bordered" className="w-fit text-white mt-8">
                <BrainCircuit /> Artificial Intelligence
              </Button>
              <h1 className="text-5xl font-bold text-white mt-12">
                The complex math behind word vectoring.
              </h1>
              <div className="mt-6 overflow-y-auto text-white flex-1">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum felis, vel
                  vestibulum diam mattis sit amet. Aliquam commodo id metus auctor mattis. Sed dapibus velit imperdiet
                  nisl aliquam ornare. Ut placerat ipsum nunc, eget porta dolor pharetra eu. Nam mi dolor, interdum id
                  sodales luctus, dignissim id mi. Proin nec turpis ac metus dignissim malesuada eu nec turpis. In eu
                  feugiat nisl. Aenean vel rutrum orci. Proin in orci ultrices leo fermentum imperdiet. Donec eget sem
                  semper, molestie quam ullamcorper, ultricies orci. Vestibulum semper arcu vulputate lacus aliquam
                  mollis. Fusce faucibus, nulla non molestie fringilla, mi sem pretium est, eu convallis massa odio et
                  justo. Donec imperdiet, justo sodales elementum rhoncus, risus quam tincidunt massa, congue tincidunt
                  ante eros vel arcu.
                </p>
              </div>
              <div className={'my-6 text-white'}>
                <p>
                  Nov 17, 2024
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}