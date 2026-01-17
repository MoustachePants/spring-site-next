import '../home.css';
import MapFooter from '@/components/MapFooter/MapFooter';
import MapWrapper from '@/components/Map/MapWrapper';
import Panel from '@/components/ui/Panel/Panel';
import { Suspense } from 'react';
import Loading from './loading';
import { MainPageContextProvider } from '@/context/MainPageContext';
import { DataContextProvider } from '@/context/DataContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainPageContextProvider>
      <Suspense fallback={<Loading />}>
        <DataContextProvider>
          <main className="main-container">
            <Panel>{children}</Panel>
            <section className="map-wrapper">
              <MapWrapper />
              <MapFooter />
            </section>
          </main>
        </DataContextProvider>
      </Suspense>
    </MainPageContextProvider>
  );
}
