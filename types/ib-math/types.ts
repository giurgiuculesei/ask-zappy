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
  topicId: string;
  topicName: string;
  topicOrder: number;
  topicLink: string;
  subTopicId: string;
  subTopicName: string;
  subTopicLink: string;
  subTopicLevelDescription: string;
};

type Difficulty = "mild" | "medium" | "spicy";

type Paper = "paper1" | "paper2";

type Question = {
  id: string;
  difficulty: Difficulty;
  paper: Paper;
  maximumMark: number;
  calculatorAllowed: boolean;
  questionHtml: string;
  markupHtml: string;
};

type QuestionsPage = {
  items: Question[];
  nextCursor?: string | null;
  hasNext?: boolean;
};
