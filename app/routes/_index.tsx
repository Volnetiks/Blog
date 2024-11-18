import MainArticle from '~/components/MainArticle';
import Article from '~/components/Article';
import Header from '~/components/Navbar';

export default function Index() {
  return (
    <div>
      <Header activatedIndex={1} />
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