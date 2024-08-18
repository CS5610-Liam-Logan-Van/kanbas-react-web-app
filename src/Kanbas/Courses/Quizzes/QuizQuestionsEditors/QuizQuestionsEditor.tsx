import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as client from '../client';
import MultipleChoiceEditor from './MultipleChoiceEditor';
import TrueFalseEditor from './TFEditor';
import FillInBlankEditor from './FillInBlankEditor';

interface Question {
    id: string;
    type: 'Multiple Choice' | 'True/False' | 'Fill in the Blank';
    title: string;
    points: number;
    question: string;
    choices?: { id: string; option: string }[];
    correct_choice?: string | boolean;
    correct_answers?: string[];
}

interface QuizQuestionsEditorProps {
    quizId: string | undefined;
}

export default function QuizQuestionsEditor({ quizId }: QuizQuestionsEditorProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (quizId) {
                const fetchedQuestions = await client.fetchQuizQuestions(quizId);
                setQuestions(fetchedQuestions);
            }
        };
        fetchQuestions();
    }, [quizId]);

    const addQuestion = (type: Question['type']) => {
        const newQuestion: Question = {
            id: Date.now().toString(),
            type,
            title: '',
            points: 1,
            question: '',
            choices: type === 'Multiple Choice' ? [] : undefined,
            correct_choice: type === 'True/False' ? false : undefined,
            correct_answers: type === 'Fill in the Blank' ? [] : undefined,
        };
        setQuestions([...questions, newQuestion]);
        setCurrentQuestion(newQuestion);
    };

    const updateQuestion = (updatedQuestion: Question) => {
        setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
        setCurrentQuestion(null);
    };

    const deleteQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
        if (currentQuestion?.id === id) {
            setCurrentQuestion(null);
        }
    };

    const handleCancel = () => {
        setCurrentQuestion(null);
    };

    return (
        <div>
            <h1>Questions Editor</h1>
            <div>
                <button onClick={() => addQuestion('Multiple Choice')} className="btn btn-primary me-2">+ New Multiple Choice Question</button>
                <button onClick={() => addQuestion('True/False')} className="btn btn-primary me-2">+ New True/False Question</button>
                <button onClick={() => addQuestion('Fill in the Blank')} className="btn btn-primary">+ New Fill in the Blank Question</button>
            </div>
            <ul className="mt-4 list-group">
                {questions.map(q => (
                    <li key={q.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{q.title || 'Untitled Question'} ({q.type})</span>
                        <div>
                            <button onClick={() => setCurrentQuestion(q)} className="btn btn-secondary me-2">Edit</button>
                            <button onClick={() => deleteQuestion(q.id)} className="btn btn-danger">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {currentQuestion && (
                <div className="mt-4">
                    {currentQuestion.type === 'Multiple Choice' && (
                        <MultipleChoiceEditor
                            question={currentQuestion as any}
                            onSave={updateQuestion}
                            onCancel={handleCancel}
                        />
                    )}
                    {currentQuestion.type === 'True/False' && (
                        <TrueFalseEditor
                            question={currentQuestion as any}
                            onSave={updateQuestion}
                            onCancel={handleCancel}
                        />
                    )}
                    {currentQuestion.type === 'Fill in the Blank' && (
                        <FillInBlankEditor
                            question={currentQuestion as any}
                            onSave={updateQuestion}
                            onCancel={handleCancel}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
