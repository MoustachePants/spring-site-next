import '../home.css';
import MapFooter from '@/components/MapFooter/MapFooter';
import MapWrapper from '@/components/Map/MapWrapper';
import Panel from '@/components/ui/Panel/Panel';
import { Suspense } from 'react';
import Loading from './loading';
import { MainPageContextProvider } from '@/context/MainPageContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainPageContextProvider>
      <main className="main-container">
        <Panel>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </Panel>
        <section className="map-wrapper">
          <MapWrapper />
          <MapFooter />
        </section>
      </main>
    </MainPageContextProvider>
  );
}
