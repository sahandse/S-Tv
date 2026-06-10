interface Props {
  message: string;
}

export default function ErrorPage({ message }: Props) {
  return (
    <div className="fixed inset-0 bg-[#08080e] flex flex-col items-center justify-center gap-5 p-6 text-center">
      <div className="text-6xl mb-2">📡</div>
      <h1 className="text-xl font-bold text-white">خطا در اتصال</h1>
      <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-violet-900/40"
      >
        تلاش مجدد
      </button>
    </div>
  );
}
