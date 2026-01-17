import ListSkeleton from '@/components/loading/skeleton/ListSkeleton/ListSkeleton';
import Header from '@/components/panel/Header/Header';
import { PanelHeader } from '@/components/ui/Panel/PanelHeader';

export default function Loading() {
  return (
    <>
      <PanelHeader header={<Header />} />
      <ListSkeleton />
    </>
  );
}
