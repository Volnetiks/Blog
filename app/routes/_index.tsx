import Header from '~/components/Navbar';
import { Divider, Image, Link } from '@nextui-org/react';
import React from 'react';
import { Instagram } from 'lucide-react';
import Footer from '~/components/Footer';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

export default function Index() {
  const markdownText =
    `# First Impressions of Warsaw

Warsaw is an incredible mix of old and new. As the capital of Poland, it's full of history, but it also feels super modern with its skyscrapers and tech scene. It's definitely a place that will keep me on my toes, with something always happening.

![Warsaw City](https://i.redd.it/4g32yp3kfug31.jpg)

# Studying at Warsaw University of Technology

I'll be studying Computer Science at Warsaw University of Technology (WUT), one of the best technical universities in Europe. The campus looks impressive, and the vibe feels really nice. I'm excited to be part of such a respected school, especially when tech and engineering are my thing.

# More about Warsaw
Warsaw, the capital of Poland, is a bustling city with a population of around 1.8 million people. It’s known for its rich history, which is reflected in landmarks like the Royal Castle, the Old Town, and the iconic Palace of Culture and Science. The city is also a paradise for food lovers, offering everything from traditional Polish dishes like pierogi and bigos to a vibrant international dining scene. Warsaw uses the Polish złoty (PLN, 1 zl is about 4 euros) as its currency, and living costs are relatively affordable compared to other European capitals. Whether you’re exploring the beautiful Łazienki Park, visiting museums like the Museum of the History of Polish Jews, or enjoying the sight of the Old City, Warsaw offers a unique mix of culture, history, and modern energy.

# Getting There from Angers

To get to Warsaw, I'll fly out of **Nantes (NTE / AF7507)**, with a layover in **Paris (CDG / AF1146)**, and land at Warsaw Chopin Airport (WAW). The flight looks smooth, and from the airport, getting into the city seems pretty easy with public transport or taxis.

![Flight Trip](https://i.ibb.co/t3PhB4g/flight-trip.png)

# My Place in Warsaw

I'll be living in a studio on Braci Załuskich Street, which is in the northern part of the city. It's a quiet, comfortable area with everything I need nearby. Plus, it's well-connected, so getting to WUT or exploring Warsaw won't be a problem. Housing in Warsaw can be a bit pricey, especially since many buildings are quite new. To add to that, Polish people spend around 70% of their salary on housing, which is a lot higher compared to France, where it’s about 40%.

![Apartment](https://galeria.domiporta.pl/pictures/small/14/2b/f9/f92b4775c571654fa748521979c968891b0e2cf9/wynajme-mieszkanie-warszawa-wilanow.jpg)

# Getting Around Warsaw
Warsaw’s public transport system is super efficient, with plenty of options to get around the city. From my place, I’ll mainly be using Metro Line 1 to get to WUT, which is fast and reliable. There are also plenty of buses running throughout the city, making it easy to reach other areas whenever needed. Public transport in Warsaw costs about as much as in Angers, with a yearly ticket price of around 250€.

![Public Transport](https://i.ibb.co/CJ80QY7/Screenshot-2025-01-16-081933.png)

# Student Life and ESN

One of the things I'm most looking forward to is student life here. I've heard amazing things about the Erasmus Student Network (ESN). They organize events, trips, and meetups, which will be perfect for making friends and getting to know the city. Their ESNcard sounds like a must—it provides discounts on transport, restaurants, and more.

![ESN](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyF0003BP2WBbTBUHwbAMhIAq60SE7Mp5mZA&s)

# Good Deals with the ESNcard

Speaking of discounts, the ESNcard seems like it will be a lifesaver. It offers reduced prices on everything from public transport to museums and even some cafes. It's definitely something I'll get when I arrive.`;

  return (<div>
    <title>Thomas Béchu</title>
    <Header activatedIndex={0} />
    <div className={'flex w-full items-center lg:items-start flex-col lg:flex-row lg:justify-evenly mt-20 mb-16'}>
      <div
        className={'flex flex-col text-center lg:items-start items-center lg:text-left gap-3 lg:max-w-[35%] max-w-[80%] mb-8'}>
        <Image width={200} src={'/me.jpg'} />
        <p className={'font-bold text-6xl mt-4'}>I'm Thomas Béchu</p>
        <p className={'text-2xl'}>A 5th Semester Erasmus Student in Warsaw University of Technology</p>
        <div className={'flex flex-row gap-4'}>
          <Link href={'https://www.instagram.com/thomas_bechu/'} className={'text-black'}>
            <Instagram size={30} />
          </Link>
        </div>
      </div>
      <div className={'flex flex-col max-w-[80%] lg:max-w-[35%] gap-4'}>
        <div className={'flex flex-col gap-6 mb-6'}>
          <div className="prose lg:prose-xl flex-none justify-center min-w-full px-16">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />
            <Markdown remarkPlugins={[remarkMath, remarkGfm]}
                      rehypePlugins={[rehypeKatex, [rehypeHighlight, { ignoreMissing: true }], rehypeRaw]}>{markdownText
            }</Markdown>
          </div>
        </div>
      </div>
    </div>
    <Divider />
    <Footer />
  </div>);
}