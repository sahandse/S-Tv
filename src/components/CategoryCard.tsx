import { Link } from 'react-router-dom';
import type { Category } from '../types';

interface Props {
  category: Category;
  channelCount: number;
}

const FA_NAMES: Record<string, string> = {
  animation: 'انیمیشن',
  auto: 'خودرو',
  business: 'بازرگانی',
  classic: 'کلاسیک',
  comedy: 'کمدی',
  cooking: 'آشپزی',
  culture: 'فرهنگی',
  documentary: 'مستند',
  education: 'آموزشی',
  entertainment: 'سرگرمی',
  family: 'خانوادگی',
  general: 'عمومی',
  horror: 'ترسناک',
  kids: 'کودکان',
  legislative: 'قانونگذاری',
  lifestyle: 'سبک زندگی',
  movies: 'فیلم',
  music: 'موسیقی',
  news: 'خبری',
  outdoor: 'طبیعت',
  religious: 'مذهبی',
  science: 'علمی',
  shop: 'خرید',
  sports: 'ورزشی',
  travel: 'گردشگری',
  weather: 'آب‌وهوا',
};

const ICONS: Record<string, string> = {
  animation: '🎨', auto: '🚗', business: '💼', classic: '📺',
  comedy: '😄', cooking: '👨‍🍳', culture: '🎭', documentary: '🎥',
  education: '📚', entertainment: '🎪', family: '👨‍👩‍👧', general: '📡',
  horror: '👻', kids: '🧸', legislative: '🏛️', lifestyle: '✨',
  movies: '🎬', music: '🎵', news: '📰', outdoor: '🏕️',
  religious: '⛪', science: '🔬', shop: '🛍️', sports: '⚽',
  travel: '✈️', weather: '⛅',
};

const GRADIENTS: Record<string, string> = {
  news:          'from-sky-600 via-blue-700 to-indigo-900',
  sports:        'from-emerald-600 via-green-700 to-teal-900',
  movies:        'from-rose-600 via-red-700 to-red-900',
  music:         'from-violet-600 via-purple-700 to-purple-900',
  kids:          'from-yellow-500 via-amber-600 to-orange-800',
  documentary:   'from-teal-600 via-cyan-700 to-cyan-900',
  entertainment: 'from-fuchsia-600 via-pink-700 to-pink-900',
  business:      'from-indigo-600 via-blue-700 to-slate-900',
  cooking:       'from-orange-500 via-amber-600 to-yellow-900',
  travel:        'from-cyan-500 via-sky-600 to-blue-900',
  education:     'from-green-600 via-emerald-700 to-teal-900',
  science:       'from-blue-600 via-indigo-700 to-violet-900',
  religious:     'from-amber-600 via-yellow-700 to-orange-900',
  family:        'from-pink-500 via-rose-600 to-red-900',
  general:       'from-slate-600 via-zinc-700 to-zinc-900',
};

export default function CategoryCard({ category, channelCount }: Props) {
  const icon = ICONS[category.id] ?? '📺';
  const name = FA_NAMES[category.id] ?? category.name;
  const gradient = GRADIENTS[category.id] ?? 'from-zinc-700 via-zinc-800 to-zinc-900';

  return (
    <Link
      to={`/genre/${category.id}`}
      className={`group relative w-36 shrink-0 h-28 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} border border-white/10 hover:border-white/25 hover:scale-105 transition-all duration-200 card-press shadow-lg`}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative h-full flex flex-col items-center justify-center gap-1.5 p-3">
        <span className="text-3xl drop-shadow-lg" role="img" aria-label={name}>{icon}</span>
        <p className="text-xs font-bold text-white text-center leading-tight drop-shadow group-hover:scale-105 transition-transform">
          {name}
        </p>
        <span className="text-[10px] text-white/60 font-medium">
          {channelCount.toLocaleString('fa-IR')} کانال
        </span>
      </div>
    </Link>
  );
}
