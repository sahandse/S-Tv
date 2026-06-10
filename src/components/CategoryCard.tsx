import { Link } from 'react-router-dom';
import type { Category } from '../types';

interface Props {
  category: Category;
  channelCount: number;
}

const ICONS: Record<string, string> = {
  animation: '🎨',
  auto: '🚗',
  business: '💼',
  classic: '📺',
  comedy: '😄',
  cooking: '👨‍🍳',
  culture: '🎭',
  documentary: '🎥',
  education: '📚',
  entertainment: '🎪',
  family: '👨‍👩‍👧',
  general: '📡',
  horror: '👻',
  kids: '🧸',
  legislative: '🏛️',
  lifestyle: '✨',
  movies: '🎬',
  music: '🎵',
  news: '📰',
  outdoor: '🏕️',
  religious: '⛪',
  science: '🔬',
  shop: '🛍️',
  sports: '⚽',
  travel: '✈️',
  weather: '⛅',
};

const GRADIENTS: Record<string, string> = {
  news: 'from-sky-900/60 to-blue-950/80',
  sports: 'from-emerald-900/60 to-green-950/80',
  movies: 'from-rose-900/60 to-red-950/80',
  music: 'from-violet-900/60 to-purple-950/80',
  kids: 'from-yellow-900/60 to-amber-950/80',
  documentary: 'from-teal-900/60 to-cyan-950/80',
  entertainment: 'from-fuchsia-900/60 to-pink-950/80',
  business: 'from-indigo-900/60 to-slate-950/80',
  cooking: 'from-orange-900/60 to-amber-950/80',
};

export default function CategoryCard({ category, channelCount }: Props) {
  const icon = ICONS[category.id] ?? '📺';
  const gradient = GRADIENTS[category.id] ?? 'from-zinc-800/60 to-zinc-900/80';

  return (
    <Link
      to={`/genre/${category.id}`}
      className={`group relative w-36 shrink-0 h-24 rounded-xl overflow-hidden bg-gradient-to-br ${gradient} border border-white/5 hover:border-violet-500/40 transition-all duration-200 card-glow`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3">
        <span className="text-3xl" role="img" aria-label={category.name}>
          {icon}
        </span>
        <p className="text-xs font-semibold text-white text-center leading-tight group-hover:text-violet-200 transition-colors">
          {category.name}
        </p>
        <p className="text-[10px] text-zinc-400">{channelCount} ch</p>
      </div>
    </Link>
  );
}
