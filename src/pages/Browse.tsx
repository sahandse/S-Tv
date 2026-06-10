import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIPTV } from '../context/IPTVContext';
import ChannelCard from '../components/ChannelCard';
import PlayerModal from '../components/PlayerModal';
import type { Channel, Stream } from '../types';

interface Playing {
  channel: Channel;
  stream: Stream;
}

function getFlagEmoji(code: string) {
  if (!code || code.length !== 2) return '🌐';
  return String.fromCodePoint(
    ...code.toUpperCase().split('').map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}

export default function Browse({ mode }: { mode: 'country' | 'category' | 'all-countries' | 'all-genres' }) {
  const { code, id } = useParams<{ code?: string; id?: string }>();
  const { channels, streamMap, logoMap, countries, categories, countByCountry, countByCategory } =
    useIPTV();

  const [search, setSearch] = useState('');
  const [qualityFilter, setQualityFilter] = useState<'all' | 'hd' | 'sd'>('all');
  const [playing, setPlaying] = useState<Playing | null>(null);

  const countryMap = new Map(countries.map((c) => [c.code, c]));
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  // Resolve title and flag for header
  const heading = useMemo(() => {
    if (mode === 'country' && code) {
      const c = countryMap.get(code.toUpperCase());
      return {
        title: c?.name ?? code.toUpperCase(),
        flag: c?.flag || getFlagEmoji(code),
        count: countByCountry.get(code.toUpperCase()) ?? 0,
      };
    }
    if (mode === 'category' && id) {
      const c = categoryMap.get(id);
      return { title: c?.name ?? id, flag: null, count: countByCategory.get(id) ?? 0 };
    }
    if (mode === 'all-countries') return { title: 'All Countries', flag: '🌍', count: countries.filter(c => countByCountry.has(c.code)).length };
    if (mode === 'all-genres') return { title: 'All Genres', flag: '🎬', count: categories.filter(c => (countByCategory.get(c.id) ?? 0) > 0).length };
    return { title: '', flag: null, count: 0 };
  }, [mode, code, id, countries, categories, countByCountry, countByCategory]);

  // For all-countries / all-genres modes, show cards instead of channels
  const isListMode = mode === 'all-countries' || mode === 'all-genres';

  // Filter channels
  const filtered = useMemo(() => {
    if (isListMode) return [];

    let list = channels;

    if (mode === 'country' && code) {
      list = list.filter((ch) => ch.country === code.toUpperCase());
    } else if (mode === 'category' && id) {
      list = list.filter((ch) => ch.categories.includes(id));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (ch) =>
          ch.name.toLowerCase().includes(q) ||
          ch.alt_names.some((n) => n.toLowerCase().includes(q)),
      );
    }

    if (qualityFilter !== 'all') {
      list = list.filter((ch) => {
        const s = streamMap.get(ch.id);
        if (!s?.quality) return qualityFilter === 'sd';
        const q = s.quality.toLowerCase();
        if (qualityFilter === 'hd') return q.includes('hd') || q.includes('1080') || q.includes('720') || q.includes('4k');
        return !q.includes('hd') && !q.includes('1080') && !q.includes('720') && !q.includes('4k');
      });
    }

    return list;
  }, [channels, mode, code, id, search, qualityFilter, streamMap, isListMode]);

  // For all-countries list
  const allCountries = useMemo(() => {
    if (mode !== 'all-countries') return [];
    return countries
      .filter((c) => countByCountry.has(c.code))
      .sort((a, b) => (countByCountry.get(b.code) ?? 0) - (countByCountry.get(a.code) ?? 0));
  }, [mode, countries, countByCountry]);

  // For all-genres list
  const allGenres = useMemo(() => {
    if (mode !== 'all-genres') return [];
    return categories
      .filter((c) => (countByCategory.get(c.id) ?? 0) > 0)
      .sort((a, b) => (countByCategory.get(b.id) ?? 0) - (countByCategory.get(a.id) ?? 0));
  }, [mode, categories, countByCategory]);

  const GENRE_ICONS: Record<string, string> = {
    animation: '🎨', auto: '🚗', business: '💼', classic: '📺', comedy: '😄',
    cooking: '👨‍🍳', culture: '🎭', documentary: '🎥', education: '📚',
    entertainment: '🎪', family: '👨‍👩‍👧', general: '📡', horror: '👻',
    kids: '🧸', legislative: '🏛️', lifestyle: '✨', movies: '🎬', music: '🎵',
    news: '📰', outdoor: '🏕️', religious: '⛪', science: '🔬', shop: '🛍️',
    sports: '⚽', travel: '✈️', weather: '⛅',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pb-16">
      {/* Page header */}
      <div className="border-b border-zinc-800/50 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-sm mb-4 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <div className="flex items-center gap-3">
            {heading.flag && <span className="text-3xl">{heading.flag}</span>}
            <div>
              <h1 className="text-2xl font-bold text-white">{heading.title}</h1>
              <p className="text-sm text-zinc-500 mt-0.5">
                {isListMode ? `${heading.count} available` : `${filtered.length} channels`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* All Countries */}
        {mode === 'all-countries' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {allCountries.map((country) => (
              <Link
                key={country.code}
                to={`/country/${country.code}`}
                className="group flex flex-col items-center gap-2.5 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-violet-500/40 transition-all duration-200 card-glow"
              >
                <span className="text-4xl">{country.flag || getFlagEmoji(country.code)}</span>
                <div className="text-center">
                  <p className="text-xs font-semibold text-zinc-200 truncate w-full group-hover:text-white">
                    {country.name}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    {countByCountry.get(country.code)} ch
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* All Genres */}
        {mode === 'all-genres' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {allGenres.map((cat) => (
              <Link
                key={cat.id}
                to={`/genre/${cat.id}`}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-violet-500/40 transition-all duration-200 card-glow"
              >
                <span className="text-3xl">{GENRE_ICONS[cat.id] ?? '📺'}</span>
                <div className="text-center">
                  <p className="text-xs font-semibold text-zinc-200 group-hover:text-white">
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    {countByCategory.get(cat.id)} channels
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Channel list mode: search + filters */}
        {!isListMode && (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none">
                  <circle cx={11} cy={11} r={8} /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search channels…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'hd', 'sd'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQualityFilter(q)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase transition-colors border ${
                      qualityFilter === q
                        ? 'bg-violet-600 border-violet-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {q === 'all' ? 'All' : q.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <span className="text-5xl">📭</span>
                <p className="text-zinc-400 text-sm">No channels found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {filtered.map((ch) => {
                  const stream = streamMap.get(ch.id)!;
                  const country = countryMap.get(ch.country);
                  const flag = country?.flag || getFlagEmoji(ch.country);
                  return (
                    <ChannelCard
                      key={ch.id}
                      channel={ch}
                      stream={stream}
                      logoUrl={logoMap.get(ch.id)}
                      countryFlag={flag}
                      onClick={() => setPlaying({ channel: ch, stream })}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {playing && (
        <PlayerModal
          channel={playing.channel}
          stream={playing.stream}
          logoUrl={logoMap.get(playing.channel.id)}
          countryName={countryMap.get(playing.channel.country)?.name}
          countryFlag={
            countryMap.get(playing.channel.country)?.flag ||
            getFlagEmoji(playing.channel.country)
          }
          onClose={() => setPlaying(null)}
        />
      )}
    </div>
  );
}
