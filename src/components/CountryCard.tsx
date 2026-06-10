import { Link } from 'react-router-dom';
import type { Country } from '../types';

interface Props {
  country: Country;
  channelCount: number;
}

function getFlagEmoji(code: string) {
  if (!code || code.length !== 2) return '🌐';
  return String.fromCodePoint(
    ...code.toUpperCase().split('').map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}

export default function CountryCard({ country, channelCount }: Props) {
  const flag = country.flag || getFlagEmoji(country.code);

  return (
    <Link
      to={`/country/${country.code}`}
      className="group flex flex-col items-center gap-2 w-24 shrink-0 p-3 pt-4 rounded-2xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 hover:border-violet-500/40 transition-all duration-200 hover:scale-105 card-press"
    >
      <span className="text-4xl leading-none drop-shadow-sm" role="img" aria-label={country.name}>
        {flag}
      </span>
      <div className="text-center w-full">
        <p className="text-xs font-semibold text-zinc-200 leading-tight line-clamp-2 group-hover:text-white transition-colors min-h-[2rem] flex items-center justify-center">
          {country.name}
        </p>
        <p className="text-[10px] text-violet-400 font-medium mt-1">
          {channelCount.toLocaleString('fa-IR')} کانال
        </p>
      </div>
    </Link>
  );
}
