import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { getChannels, getStreams, getLogos, getCountries, getCategories } from '../api/iptv';
import type { Channel, Stream, Country, Category } from '../types';

export interface IPTVState {
  channels: Channel[];
  streamMap: Map<string, Stream>;
  logoMap: Map<string, string>;
  countries: Country[];
  categories: Category[];
  countByCountry: Map<string, number>;
  countByCategory: Map<string, number>;
  loading: boolean;
  error: string | null;
}

const IPTVContext = createContext<IPTVState | null>(null);

export function IPTVProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<IPTVState>({
    channels: [],
    streamMap: new Map(),
    logoMap: new Map(),
    countries: [],
    categories: [],
    countByCountry: new Map(),
    countByCategory: new Map(),
    loading: true,
    error: null,
  });

  useEffect(() => {
    Promise.all([getChannels(), getStreams(), getCountries(), getCategories()])
      .then(([channels, streams, countries, categories]) => {
        const streamMap = new Map<string, Stream>();
        for (const s of streams) {
          if (s.channel && s.url && !streamMap.has(s.channel)) {
            streamMap.set(s.channel, s);
          }
        }

        const liveChannels = channels.filter(
          (ch) => !ch.closed && !ch.is_nsfw && streamMap.has(ch.id),
        );

        const countByCountry = new Map<string, number>();
        for (const ch of liveChannels) {
          if (ch.country) {
            countByCountry.set(ch.country, (countByCountry.get(ch.country) ?? 0) + 1);
          }
        }

        const countByCategory = new Map<string, number>();
        for (const ch of liveChannels) {
          for (const cat of ch.categories) {
            countByCategory.set(cat, (countByCategory.get(cat) ?? 0) + 1);
          }
        }

        setState((prev) => ({
          ...prev,
          channels: liveChannels,
          streamMap,
          countries,
          categories,
          countByCountry,
          countByCategory,
          loading: false,
          error: null,
        }));

        // Load logos in background — not critical
        getLogos()
          .then((logos) => {
            const logoMap = new Map<string, string>();
            for (const logo of logos) {
              if (logo.in_use && logo.url && !logoMap.has(logo.channel)) {
                logoMap.set(logo.channel, logo.url);
              }
            }
            setState((prev) => ({ ...prev, logoMap }));
          })
          .catch(() => {});
      })
      .catch((err: Error) => {
        setState((prev) => ({ ...prev, loading: false, error: err.message }));
      });
  }, []);

  return <IPTVContext.Provider value={state}>{children}</IPTVContext.Provider>;
}

export function useIPTV() {
  const ctx = useContext(IPTVContext);
  if (!ctx) throw new Error('useIPTV must be used inside IPTVProvider');
  return ctx;
}
