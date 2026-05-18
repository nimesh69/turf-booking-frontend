export interface PlayerProfile {
  id: string;
  userId: string;
  bio: string;
  sports: string[];
  preferredPositions: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  totalMatches: number;
  rating: number;
}
