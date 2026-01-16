import '../home.css';
import MapFooter from '@/components/MapFooter/MapFooter';
import MapWrapper from '@/components/Map/MapWrapper';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="main-container">
      {children}
      <section className="map-wrapper">
        <MapWrapper />
        <MapFooter />
      </section>
    </main>
  );
}
