export interface Question{
    id: string;
    answer: string;
    question: string;
    options: string[]
    level: 'easy' |'medium' | 'hard'


}