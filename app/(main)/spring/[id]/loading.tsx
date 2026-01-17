import DetailsSkeleton from '@/components/loading/skeleton/DetailsSkeleton/DetailsSkeleton';
import { PanelHeader } from '@/components/ui/Panel/PanelHeader';

export default function Loading() {
  return (
    <>
      <PanelHeader header={null} />
      <DetailsSkeleton />
    </>
  );
}
