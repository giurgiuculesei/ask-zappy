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