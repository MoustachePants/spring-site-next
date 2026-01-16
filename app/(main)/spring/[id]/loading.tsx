import DetailsSkeleton from '@/components/loading/skeleton/DetailsSkeleton/DetailsSkeleton';
import Panel from '@/components/ui/Panel/Panel';

export default function Loading() {
  return (
    <Panel>
      <DetailsSkeleton />
    </Panel>
  );
}
