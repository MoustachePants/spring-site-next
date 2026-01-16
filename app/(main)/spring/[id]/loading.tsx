import DetailsSkeleton from '@/components/loading/skeleton/DetailsSkeleton/DetailsSkeleton';
import { PanelHeader } from '@/components/ui/Panel/Panel';

export default function Loading() {
  return (
    <>
      <PanelHeader header={null} />
      <DetailsSkeleton />
    </>
  );
}
