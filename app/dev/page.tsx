import type { ReactNode } from "react";

import listSprings from "@/app/actions/listSprings";
import { Spring } from "@/models/types/spring";
import getSpring from "@/app/actions/getSpring";

export const dynamic = "force-dynamic";

const DevPage = async () => {
  const response = await listSprings();
  const spring = await getSpring("62b6fd3a5b0f3213b08f6899");
  console.log("single spring", spring);

  if (response.status === "error") {
    return (
      <main className="space-y-4 p-6">
        <h1 className="text-2xl font-semibold">Dev · listSprings</h1>
        <p className="text-red-500">Failed to load springs.</p>
        {response.error?.message && (
          <pre className="rounded bg-red-900/40 p-4 text-sm text-red-200">
            {response.error.message}
          </pre>
        )}
      </main>
    );
  }

  const springs = response.data ?? [];

  return (
    <main className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Dev · listSprings</h1>
        <p className="text-sm text-gray-500">
          Showing {springs.length} spring{springs.length === 1 ? "" : "s"}
        </p>
      </header>

      <section className="grid gap-4">
        {springs.map((spring) => (
          <SpringCard key={spring._id} spring={spring} />
        ))}
      </section>
    </main>
  );
};

const SpringCard = ({ spring }: { spring: Spring }) => {
  const activeCategories =
    Object.entries(spring.categories || {})
      .filter(([, isSelected]) => isSelected)
      .map(([key]) => key)
      .join(", ") || "None";

  const firstLocation = spring.location?.[0];
  const coordinates = firstLocation
    ? `${firstLocation.coordinates[0]}, ${firstLocation.coordinates[1]}`
    : "—";

  const costLabel = spring.costInShekels.ifCost
    ? `${spring.costInShekels.howMuch}₪`
    : "Free";

  return (
    <article className="rounded border border-gray-200 bg-white/70 p-4 shadow-sm">
      <header className="mb-3">
        <h2 className="text-lg font-medium">{spring.name}</h2>
        <p className="text-sm text-gray-500">
          {spring.mainRegion} · {spring.subRegion}
        </p>
      </header>

      <dl className="space-y-1 text-sm">
        <DetailRow label="Type" value={spring.springDetails.typeOf || "—"} />
        <DetailRow
          label="Temperature"
          value={`${spring.springDetails.temperature}℃`}
        />
        <DetailRow label="Cost" value={costLabel} />
        <DetailRow
          label="Accessibility"
          value={`${spring.accessibility.minutesByFoot} min walk`}
        />
        <DetailRow label="Categories" value={activeCategories} />
        <DetailRow label="First location" value={coordinates} />
        <DetailRow
          label="Last update"
          value={new Date(spring.lastUpdate).toLocaleString()}
        />
      </dl>

      <details className="mt-3">
        <summary className="cursor-pointer text-sm text-blue-600">
          Raw JSON
        </summary>
        <pre className="mt-2 max-h-64 overflow-auto rounded bg-gray-900/80 p-3 text-xs text-gray-100">
          {JSON.stringify(spring, null, 2)}
        </pre>
      </details>
    </article>
  );
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) => (
  <div className="flex justify-between gap-4">
    <dt className="w-32 text-gray-500">{label}</dt>
    <dd className="flex-1 text-right text-gray-900">{value}</dd>
  </div>
);

export default DevPage;

