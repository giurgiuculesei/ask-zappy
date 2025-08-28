type Level = 'sl' | 'hl';

type SubTopicLevel = {
    description: string;
    level: Level;
}

type SubTopic = {
    name: string;
    order: number;
    levels: SubTopicLevel[];
    free?: boolean;
}

type Topic = {
    name: string;
    order: number;
    subtopics: SubTopic[];
}

type TopicSubTopicView = {
    topicId: string;
    topicName: string;
    topicOrder: number;
    topicLink: string;
    subTopicId: string;
    subTopicName: string;
    subTopicLink: string;
    subTopicLevelDescription: string;
}

type Difficulty = "Mild" | "Medium" | "Spicy";

type Paper = "Paper 1" | "Paper 2";

type Question = {
    id: string;
    difficulty: Difficulty;
    paper: Paper;
    maximumMark: number;
    calculatorAllowed: boolean;
    questionHtml: string;
    markupHtml: string;
}

type QuestionsPage = {
    items: Question[];
    nextCursor?: string | null;
    hasNext?: boolean;
}
