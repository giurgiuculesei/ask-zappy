import { QuestionCard } from "./QuestionCard";

export default function QuestionsSSR({ items }: { items: Question[] }) {
    return (
        <>
            {items.map((q) => (
                <QuestionCard key={q.id} q={q} />
            ))
            }
        </>
    );
}