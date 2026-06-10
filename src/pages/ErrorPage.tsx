interface Props {
  message: string;
}

export default function ErrorPage({ message }: Props) {
  return (
    <div className="fixed inset-0 bg-[#0a0a0f] flex flex-col items-center justify-center gap-4 p-6">
      <span className="text-6xl">📡</span>
      <h1 className="text-xl font-bold text-white">Connection Failed</h1>
      <p className="text-zinc-400 text-sm text-center max-w-sm">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors mt-2"
      >
        Retry
      </button>
    </div>
  );
}
