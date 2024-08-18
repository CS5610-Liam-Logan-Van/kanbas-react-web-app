import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as client from './client';
import RichTextEditor, { ContentEditableEvent } from "react-simple-wysiwyg";
import MultipleChoiceEditor from './QuizQuestionsEditors/MultipleChoiceEditor';
import TrueFalseEditor from './QuizQuestionsEditors/TFEditor';
import FillInBlankEditor from './QuizQuestionsEditors/FillInBlankEditor';


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

interface Quiz {
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

export default function QuizDetailsEditor() {
    const { quizId, cid } = useParams<{ quizId: string; cid: string }>();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz>({
        title: 'Unnamed Quiz',
        description: '',
        quiz_type: 'Graded Quiz',
        total_points: 0,
        assignment_group: 'Quizzes',
        shuffle_answers: true,
        time_limit: 20,
        multiple_attempts: false,
        attempts_allowed: 1,
        show_correct_answers: 'After Submission',
        access_code: '',
        one_question_at_a_time: true,
        webcam_required: false,
        lock_questions_after_answering: false,
        due_date: new Date().toISOString().split('T')[0],
        available_date: new Date().toISOString().split('T')[0],
        until_date: new Date().toISOString().split('T')[0],
        questions: [],
    });
    const [activeTab, setActiveTab] = useState('details');
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            if (quizId && quizId !== 'new') {
                try {
                    const fetchedQuiz = await client.findQuizById(quizId);
                    setQuiz(fetchedQuiz);
                } catch (err) {
                    console.error('Failed to fetch quiz:', err);
                }
            }
        };
        fetchQuiz();
    }, [quizId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setQuiz(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleRichTextChange = (e: ContentEditableEvent) => {
        setQuiz(prev => ({ ...prev, description: e.target.value }));
    };

    const handleSubmit = async () => {
        try {
            if (quizId === 'new') {
                await client.createQuiz(quiz);
            } else {
                await client.updateQuiz(quiz);
            }
            navigate(`/Kanbas/Courses/${cid}/Quizzes`);
        } catch (err) {
            console.error('Failed to save quiz:', err);
        }
    };

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
        setQuiz(prev => ({ ...prev, questions: [...prev.questions, newQuestion] }));
        setCurrentQuestion(newQuestion);
    };

    const updateQuestion = (updatedQuestion: Question) => {
        setQuiz(prev => ({
            ...prev,
            questions: prev.questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q)
        }));
        setCurrentQuestion(null);
    };

    const deleteQuestion = (id: string) => {
        setQuiz(prev => ({
            ...prev,
            questions: prev.questions.filter(q => q.id !== id)
        }));
        if (currentQuestion?.id === id) {
            setCurrentQuestion(null);
        }
    };

    return (
        <div>
            <h2>{quiz.title}</h2>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <span>Points {quiz.total_points}</span>
                    <span className="ms-3">Not Published</span>
                </div>
                <button className="btn btn-secondary">...</button>
            </div>
            <ul className="nav nav-tabs mt-3">
                <li className="nav-item">
                    <button onClick={() => setActiveTab('details')} className={`nav-link ${activeTab === 'details' ? "active" : ""}`}>
                        Details
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => setActiveTab('questions')} className={`nav-link ${activeTab === 'questions' ? "active" : ""}`}>
                        Questions
                    </button>
                </li>
            </ul>
            {activeTab === 'details' && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Quiz Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={quiz.title} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Quiz Instructions</label>
                        <RichTextEditor value={quiz.description} onChange={handleRichTextChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quiz_type" className="form-label">Quiz Type</label>
                        <select className="form-select" id="quiz_type" name="quiz_type" value={quiz.quiz_type} onChange={handleChange}>
                            <option value="Graded Quiz">Graded Quiz</option>
                            <option value="Practice Quiz">Practice Quiz</option>
                            <option value="Graded Survey">Graded Survey</option>
                            <option value="Ungraded Survey">Ungraded Survey</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Options</label>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="shuffle_answers" name="shuffle_answers" checked={quiz.shuffle_answers} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="shuffle_answers">Shuffle Answers</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="time_limit_enabled" name="time_limit_enabled" checked={quiz.time_limit > 0} onChange={(e) => setQuiz(prev => ({ ...prev, time_limit: e.target.checked ? 20 : 0 }))} />
                            <label className="form-check-label" htmlFor="time_limit_enabled">Time Limit</label>
                            {quiz.time_limit > 0 && (
                                <input type="number" className="form-control mt-2" name="time_limit" value={quiz.time_limit} onChange={handleChange} />
                            )}
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="multiple_attempts" name="multiple_attempts" checked={quiz.multiple_attempts} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="multiple_attempts">Allow Multiple Attempts</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Assign</label>
                        <div className="border p-3">
                            <div className="mb-3">
                                <label htmlFor="assign_to" className="form-label">Assign to</label>
                                <input type="text" className="form-control" id="assign_to" value="Everyone" readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="due_date" className="form-label">Due</label>
                                <input type="date" className="form-control" id="due_date" name="due_date" value={quiz.due_date} onChange={handleChange} />
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="available_date" className="form-label">Available from</label>
                                    <input type="date" className="form-control" id="available_date" name="available_date" value={quiz.available_date} onChange={handleChange} />
                                </div>
                                <div className="col">
                                    <label htmlFor="until_date" className="form-label">Until</label>
                                    <input type="date" className="form-control" id="until_date" name="until_date" value={quiz.until_date} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}>Cancel</button>
                        <button type="submit" className="btn btn-danger">Save</button>
                    </div>
                </form>
            )}
            {activeTab === 'questions' && (
                <div>
                    <h3>Questions</h3>
                    <button onClick={() => addQuestion('Multiple Choice')} className="btn btn-primary mb-3">+ New Question</button>
                    {quiz.questions.map(q => (
                        <div key={q.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{q.title || 'Untitled Question'}</h5>
                                <p>Type: {q.type}</p>
                                <p>Points: {q.points}</p>
                                <button onClick={() => setCurrentQuestion(q)} className="btn btn-secondary me-2">Edit</button>
                                <button onClick={() => deleteQuestion(q.id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                    {currentQuestion && (
                        <div>
                            {currentQuestion.type === 'Multiple Choice' && (
                                <MultipleChoiceEditor
                                    question={currentQuestion as any}
                                    onSave={updateQuestion}
                                    onCancel={() => setCurrentQuestion(null)}
                                />
                            )}
                            {currentQuestion.type === 'True/False' && (
                                <TrueFalseEditor
                                    question={currentQuestion as any}
                                    onSave={updateQuestion}
                                    onCancel={() => setCurrentQuestion(null)}
                                />
                            )}
                            {currentQuestion.type === 'Fill in the Blank' && (
                                <FillInBlankEditor
                                    question={currentQuestion as any}
                                    onSave={updateQuestion}
                                    onCancel={() => setCurrentQuestion(null)}
                                />
                            )}
                        </div>
                    )}
                    <div className="mt-3">
                        <button onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)} className="btn btn-secondary me-2">Cancel</button>
                        <button onClick={handleSubmit} className="btn btn-primary">Save Quiz</button>
                    </div>
                </div>
            )}
        </div>
    );
}
