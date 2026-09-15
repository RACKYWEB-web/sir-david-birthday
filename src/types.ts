export type StageId =
  | 'entry'
  | 'congratulations'
  | 'identity'
  | 'hero'
  | 'impact_words'
  | 'discovery'
  | 'gift_box'
  | 'emotional_reveal'
  | 'celebration_boom'
  | 'tributes'
  | 'collective_message'
  | 'final_message'
  | 'secret_surprise';

export interface Tribute {
  id: string;
  name: string;
  role?: string;
  message: string;
  avatarSeed?: string;
  tag?: string;
  highlight?: string;
}

export interface DiscoveryCard {
  id: string;
  number: string;
  title: string;
  quote: string;
  reflection: string;
  iconName: 'Flame' | 'Eye' | 'Shield' | 'HeartHandshake';
}
