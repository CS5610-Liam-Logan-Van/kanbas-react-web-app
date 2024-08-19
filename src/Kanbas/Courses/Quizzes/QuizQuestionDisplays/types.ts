// Choice for multiple choice questions
export interface Choice {
    id: string;
    option: string;
}

// Base question interface
export interface BaseQuestion {
    id: string;
    title: string;
    type: "Fill in the Blank" | "Multiple Choice" | "True/False";
    points: number;
    question: string;
}

// Fill in the blank question
export interface FillInBlankQuestion extends BaseQuestion {
    type: "Fill in the Blank";
    correct_answers: string[];
}

// Multiple choice question
export interface MultipleChoiceQuestion extends BaseQuestion {
    type: "Multiple Choice";
    choices: Choice[];
    correct_choice: string;
}

// True/False question
export interface TrueFalseQuestion extends BaseQuestion {
    type: "True/False";
    correct_choice: boolean;
}

// Union type for all question types
export type Question = FillInBlankQuestion | MultipleChoiceQuestion | TrueFalseQuestion;

// Quiz interface
export interface Quiz {
    _id?: string;
    title: string;
    description: string;
    quiz_type: string;
    total_points: number;
    assignment_group: string;
    shuffle_answers: boolean;
    time_limit: number;
    multiple_attempts: boolean;
    attempts_allowed: number;
    show_correct_answers: string;
    access_code: string;
    one_question_at_a_time: boolean;
    webcam_required: boolean;
    lock_questions_after_answering: boolean;
    due_date: string;
    available_date: string;
    until_date: string;
    questions: Question[];
}

// Quiz attempt interface
export interface QuizAttempt {
    id: string;
    quiz_id: string;
    user_id: string;
    start_time: string;
    end_time: string;
    score: number;
    answers: QuizAnswer[];
}

// Quiz answer interface
export interface QuizAnswer {
    question_id: string;
    answer: string | string[] | boolean;
    is_correct: boolean;
}
