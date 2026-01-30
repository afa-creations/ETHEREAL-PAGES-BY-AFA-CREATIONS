
export type Section = 'Poetry' | 'Philosophy' | 'History' | 'Intro' | 'Dashboard';

export interface BibliographyEntry {
  id: string;
  title: string;
  author: string;
  publication: string;
  url?: string;
}

export interface BaseWork {
  id: string;
  title: string;
  author: string;
  content: string;
  date: string;
  type: Section;
}

export interface Poem extends BaseWork {
  backgroundImage?: string;
}

export interface Article extends BaseWork {
  tagline: string;
  closingNote?: string;
  bibliography: BibliographyEntry[];
}

export interface UserProfile {
  name: string;
  bio: string;
  isInitialised: boolean;
}

export interface AppState {
  profile: UserProfile;
  poems: Poem[];
  philosophy: Article[];
  history: Article[];
}
