import React, { useState } from 'react';

interface TrueFalseQuestion {
    id: string;
    type: 'True/False';
    title: string;
    points: number;
    question: string;
    correct_choice: boolean;
}

interface Props {
    question: TrueFalseQuestion;
    onSave: (question: TrueFalseQuestion) => void;
    onCancel: () => void;
}

export default function TrueFalseEditor({ question, onSave, onCancel }: Props) {
    const [editedQuestion, setEditedQuestion] = useState<TrueFalseQuestion>(question);
    const [error, setError] = useState<string | null>(null);

    const handleSave = () => {
        if (!editedQuestion.title || !editedQuestion.question) {
            setError('Please fill all required fields.');
            return;
        }
        onSave(editedQuestion);
    };

    return (
        <div>
            <h2>Edit True/False Question</h2>
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
                placeholder="Question Text"
                required
            />
            <label htmlFor="points">Points:</label>
            <input
                id="points"
                type="number"
                className="form-control mt-2 mb-2"
                value={editedQuestion.points}
                onChange={e => setEditedQuestion({...editedQuestion, points: Number(e.target.value)})}
                placeholder="Points"
                required
            />
            <div className="mb-4">
                <label>
                    <input
                        type="radio"
                        className="form-check-input"
                        checked={editedQuestion.correct_choice === true}
                        onChange={() => setEditedQuestion({...editedQuestion, correct_choice: true})}
                    /> True
                </label>
                <label className="mx-3">
                    <input
                        type="radio"
                        className="form-check-input"
                        checked={editedQuestion.correct_choice === false}
                        onChange={() => setEditedQuestion({...editedQuestion, correct_choice: false})}
                    /> False
                </label>
            </div>
            <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button className="btn btn-primary mx-2" onClick={handleSave}>Save Question</button>

        </div>
    );
}
