import ListSkeleton from '@/components/loading/skeleton/ListSkeleton/ListSkeleton';
import Panel from '@/components/ui/Panel/Panel';
import Header from '@/components/panel/Header/Header';

export default function Loading() {
  return (
    <Panel header={<Header />}>
      <ListSkeleton />
    </Panel>
  );
}
