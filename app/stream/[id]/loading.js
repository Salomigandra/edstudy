export default function Loading() {
  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col bg-slate-50 animate-pulse">
      <div className="h-14 bg-white border-b border-slate-100" />
      <div className="flex-1 px-4 pt-5 pb-28 space-y-4 lg:max-w-3xl lg:mx-auto lg:w-full lg:px-8">
        <div className="h-28 bg-slate-300 rounded-2xl" />
        <div className="h-5 bg-slate-200 rounded-full w-1/4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-slate-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
