import React, { useState } from 'react';

interface FillInBlankQuestion {
    id: string;
    type: 'Fill in the Blank';
    title: string;
    points: number;
    question: string;
    correct_answers: string[];
}

interface Props {
    question: FillInBlankQuestion;
    onSave: (question: FillInBlankQuestion) => void;
    onCancel: () => void;
}

export default function FillInBlankEditor({ question, onSave, onCancel }: Props) {
    const [editedQuestion, setEditedQuestion] = useState<FillInBlankQuestion>(question);
    const [error, setError] = useState<string | null>(null);

    const addAnswer = () => {
        setEditedQuestion({
            ...editedQuestion,
            correct_answers: [...editedQuestion.correct_answers, ''],
        });
    };

    const updateAnswer = (index: number, value: string) => {
        const newAnswers = [...editedQuestion.correct_answers];
        newAnswers[index] = value;
        setEditedQuestion({ ...editedQuestion, correct_answers: newAnswers });
    };

    const deleteAnswer = (index: number) => {
        const newAnswers = editedQuestion.correct_answers.filter((_, i) => i !== index);
        setEditedQuestion({ ...editedQuestion, correct_answers: newAnswers });
    };

    const handleSave = () => {
        if (!editedQuestion.title || !editedQuestion.question || editedQuestion.correct_answers.length === 0) {
            setError('Please fill all required fields and provide at least one correct answer.');
            return;
        }
        onSave(editedQuestion);
    };

    return (
        <div>
            <h2>Edit Fill in the Blank Question</h2>
            {error && <div style={{color: 'red'}}>{error}</div>}
            <label htmlFor="title">Question Title:</label>
            <input
                id="title"
                className="form-control mt-2 mb-3"
                value={editedQuestion.title}
                onChange={e => setEditedQuestion({...editedQuestion, title: e.target.value})}
                placeholder="Question Title"
                required
            />
            <label htmlFor="question">Question Text:</label>
            <textarea
                id="question"
                className="form-control mt-2 mb-3"
                value={editedQuestion.question}
                onChange={e => setEditedQuestion({...editedQuestion, question: e.target.value})}
                placeholder="Question Text (Use ___ for blank)"
                required
            />
            <p>Note: Use ___ (three underscores) to indicate where the blank should be in your question.</p>
            <label htmlFor="points">Points:</label>
            <input
                id="points"
                type="number"
                className="form-control mt-2 mb-3"
                value={editedQuestion.points}
                onChange={e => setEditedQuestion({...editedQuestion, points: Number(e.target.value)})}
                placeholder="Points"
                required
            />
            <h3>Correct Answers:</h3>
            {editedQuestion.correct_answers.map((answer, index) => (
                <div key={index}>
                    <input
                        className="form-control"
                        value={answer}
                        onChange={e => updateAnswer(index, e.target.value)}
                        placeholder="Correct Answer"
                    />
                    <button className="btn btn-danger mt-2" onClick={() => deleteAnswer(index)}>Delete</button>
                    <hr/>
                </div>
            ))}
            <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button className="btn btn-info mx-2" onClick={addAnswer}>Add Answer</button>
            <button className="btn btn-primary" onClick={handleSave}>Save Question</button>

        </div>
    );
}
