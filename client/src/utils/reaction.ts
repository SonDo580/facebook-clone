import { Reaction } from "@/constants";
import { ReactionMap } from "@/types/post";

type ReactionCount = Record<Reaction, number>;

const defaultCount: ReactionCount = {
  like: 0,
  love: 0,
  haha: 0,
  wow: 0,
  sad: 0,
  angry: 0,
};

const getReactionStatistics = (reactions: ReactionMap) => {
  let total = 0;
  const count: ReactionCount = defaultCount;

  for (const key of Object.keys(reactions)) {
    const reactionType = key as keyof typeof Reaction;
    const value = reactions[reactionType].length;
    count[reactionType] = value;
    total += value;
  }

  // Get the 3 (or less) most frequent reactions
  const sortedReactions = Object.entries(count)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value > 0)
    .sort((a, b) => b[1] - a[1]);

  const topReactions = sortedReactions
    .slice(0, 3)
    .map(([reaction]) => reaction as Reaction);

  return { total, count, topReactions };
};

const getUserReaction = (
  reactions: ReactionMap,
  userId: string
): Reaction | null => {
  for (const key of Object.keys(reactions) as Reaction[]) {
    if (reactions[key].includes(userId)) {
      return key;
    }
  }
  return null;
};

export { getReactionStatistics, getUserReaction };
