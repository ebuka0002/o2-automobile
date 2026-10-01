export function VehicleCardSkeleton() {
  return (
    <div className="border border-line bg-surface" aria-hidden="true">
      <div className="skeleton aspect-[4/3]" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton h-7 w-1/2" />
        <div className="skeleton h-4 w-full" />
        <div className="flex gap-3 pt-2">
          <div className="skeleton h-11 flex-1" />
          <div className="skeleton h-11 flex-1" />
        </div>
      </div>
    </div>
  );
}

export function VehicleDetailsSkeleton() {
  return (
    <div className="container-x pb-20 pt-28" aria-busy="true" aria-label="Loading vehicle">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="skeleton aspect-[16/10]" />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="skeleton aspect-[4/3]" />
            ))}
          </div>
        </div>
        <div className="space-y-4 lg:col-span-5">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-14 w-3/4" />
          <div className="skeleton h-10 w-1/2" />
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
