export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="animate-pulse rounded-md bg-background">
          <div className="h-56 w-full rounded-t-md bg-gray-300 dark:bg-black"></div>
          <div className="p-4">
            <div className="mb-4 h-6 w-3/4 rounded bg-gray-300 dark:bg-slate-700"></div>
            <div className="mb-2 mt-2 flex gap-x-2 text-sm">
              <div className="h-4 w-1/4 rounded bg-gray-300 dark:bg-slate-700"></div>
              <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-slate-700"></div>
              <div className="h-4 w-1/4 flex-auto rounded bg-gray-300 text-right dark:bg-slate-700"></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="h-4 w-4 rounded-full bg-gray-300 dark:bg-slate-700"></div>
              <div className="h-4 w-20 rounded bg-gray-300 dark:bg-slate-700"></div>
              <div className="h-4 w-4 rounded-full bg-gray-300 dark:bg-slate-700"></div>
              <div className="h-4 w-10 rounded bg-gray-300 dark:bg-slate-700"></div>
            </div>
            <div className="mb-2 mt-2 text-sm text-gray-700 dark:text-slate-300">
              <div className="mb-2 h-4 w-full rounded bg-gray-300 dark:bg-slate-700"></div>
              <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-slate-700"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-6 w-12 rounded-full bg-gray-300 dark:bg-slate-700"
                ></div>
              ))}
            </div>
            <div className="mt-2 text-right">
              <div className="inline-flex h-8 w-24 items-center justify-end gap-2 rounded-full bg-gray-300 dark:bg-slate-700"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
