import { Link } from 'react-router-dom';
import type { Country } from '../types';

interface Props {
  country: Country;
  channelCount: number;
}

export default function CountryCard({ country, channelCount }: Props) {
  return (
    <Link
      to={`/country/${country.code}`}
      className="group flex flex-col items-center gap-2.5 w-28 shrink-0 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-violet-500/40 transition-all duration-200 card-glow"
    >
      <span className="text-4xl leading-none" role="img" aria-label={country.name}>
        {country.flag || getFlagEmoji(country.code)}
      </span>
      <div className="text-center w-full overflow-hidden">
        <p className="text-xs font-semibold text-zinc-200 truncate group-hover:text-white transition-colors">
          {country.name}
        </p>
        <p className="text-[10px] text-zinc-500 mt-0.5">{channelCount} channels</p>
      </div>
    </Link>
  );
}

function getFlagEmoji(code: string) {
  if (!code || code.length !== 2) return '🌐';
  return String.fromCodePoint(
    ...code.toUpperCase().split('').map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}
