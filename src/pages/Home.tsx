import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useIPTV } from '../context/IPTVContext';
import CountryCard from '../components/CountryCard';
import CategoryCard from '../components/CategoryCard';
import ChannelCard from '../components/ChannelCard';
import PlayerModal from '../components/PlayerModal';
import type { Channel, Stream } from '../types';

interface Playing {
  channel: Channel;
  stream: Stream;
}

function SectionHeader({ title, to }: { title: string; to: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <Link
        to={to}
        className="text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
      >
        View all →
      </Link>
    </div>
  );
}

export default function Home() {
  const { channels, streamMap, logoMap, countries, categories, countByCountry, countByCategory } =
    useIPTV();
  const [playing, setPlaying] = useState<Playing | null>(null);

  // Top countries (sorted by channel count, top 20)
  const topCountries = countries
    .filter((c) => countByCountry.has(c.code))
    .sort((a, b) => (countByCountry.get(b.code) ?? 0) - (countByCountry.get(a.code) ?? 0))
    .slice(0, 20);

  // Top categories (sorted by channel count)
  const topCategories = categories
    .filter((c) => (countByCategory.get(c.id) ?? 0) > 0)
    .sort((a, b) => (countByCategory.get(b.id) ?? 0) - (countByCategory.get(a.id) ?? 0))
    .slice(0, 12);

  // Featured channels (first 12 channels with a logo, or just first 12)
  const featured = channels.slice(0, 24);

  // Country lookup
  const countryMap = new Map(countries.map((c) => [c.code, c]));

  function getFlagEmoji(code: string) {
    if (!code || code.length !== 2) return '🌐';
    return String.fromCodePoint(
      ...code.toUpperCase().split('').map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-violet-950/30 to-[#0a0a0f] px-4 sm:px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(139,92,246,0.08),transparent)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            {channels.length.toLocaleString()} Live Channels Available
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight">
            Watch the World,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Live & Free
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Thousands of satellite and cable channels from every country, streamed directly in your browser.
          </p>
          <div className="flex items-center justify-center gap-3 mt-7">
            <Link
              to="/countries"
              className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-violet-900/40"
            >
              Browse by Country
            </Link>
            <Link
              to="/genres"
              className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              Browse by Genre
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 space-y-12">
        {/* Countries */}
        <section>
          <SectionHeader title="🌍 Browse by Country" to="/countries" />
          <div className="scroll-row pb-3">
            {topCountries.map((country) => (
              <CountryCard
                key={country.code}
                country={country}
                channelCount={countByCountry.get(country.code) ?? 0}
              />
            ))}
          </div>
        </section>

        {/* Genres */}
        <section>
          <SectionHeader title="🎬 Browse by Genre" to="/genres" />
          <div className="scroll-row pb-3">
            {topCategories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                channelCount={countByCategory.get(cat.id) ?? 0}
              />
            ))}
          </div>
        </section>

        {/* Featured channels */}
        <section>
          <SectionHeader title="📡 Featured Channels" to="/countries" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {featured.map((ch) => {
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
        </section>
      </div>

      {/* Player Modal */}
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
