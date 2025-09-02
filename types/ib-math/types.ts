type Level = "sl" | "hl";

type SubTopicLevel = {
  description: string;
  level: Level;
};

type SubTopic = {
  id: number;
  name: string;
  levels: SubTopicLevel[];
  free?: boolean;
};

type Topic = {
  id: number;
  name: string;
  subtopics: SubTopic[];
};

type TopicSubTopicView = {
  topicId: number;
  topicName: string;
  topicOrder: number;
  topicLink: string;
  subTopicId: number;
  subTopicName: string;
  subTopicLink: string;
  subTopicLevelDescription: string;
};

type Difficulty = "mild" | "medium" | "spicy";

type Paper = "paper1" | "paper2";

type Question = {
  id: number;
  difficulty: Difficulty;
  paper: Paper;
  questionHtml: string;
  markSchemeHtml: string;
};

type QuestionsPage = {
  items: Question[];
  nextCursor?: number | null;
};
