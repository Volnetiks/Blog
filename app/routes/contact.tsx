import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';
import Header from '~/components/Navbar';

export default function Contact() {
  useEffect(() => {
    (async function() {
      const cal = await getCalApi({ 'namespace': '15min' });
      cal('ui', {
        'styles': { 'branding': { 'brandColor': '#000000' } },
        'hideEventTypeDetails': false,
        'layout': 'column_view'
      });
    })();
  }, []);

  return (
    <div>
      <Header activatedIndex={8} />
      <div className={'flex flex-row justify-center'}>
        <Cal namespace="15min"
             calLink="thomas-bechu/30min"
             style={{ width: '100%', height: '100%', overflow: 'scroll' }}
             config={{ 'layout': 'month_view' }}
        />
      </div>
    </div>
  );
}