import { NextPage } from 'next';
import '../home.css';
import Header from '@/components/panel/Header/Header';
import { PanelHeader } from '@/components/ui/Panel/PanelHeader';
import listSprings from '../actions/listSprings';
import MainContent from '@/components/pageContent/MainContent/MainContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: {
      'he-IL': '/',
    },
  },
};

const Home: NextPage = async () => {
  const springsResponse = await listSprings();
  const initialSprings = springsResponse.data ? springsResponse.data : [];

  return (
    <>
      <h1 className="sr-only">המעיין הנובע - רשימת מעיינות ונחלים בישראל</h1>
      <PanelHeader header={<Header />} />
      <MainContent initialSprings={initialSprings} />
    </>
  );
};

export default Home;
