import React, {useState} from 'react';

interface MultipleChoiceQuestion {
    id: string;
    type: 'Multiple Choice';
    title: string;
    points: number;
    question: string;
    choices: { id: string; option: string }[];
    correct_choice: string;
}

interface Props {
    question: MultipleChoiceQuestion;
    onSave: (question: MultipleChoiceQuestion) => void;
    onCancel: () => void;
}

export default function MultipleChoiceEditor({question, onSave, onCancel}: Props) {
    const [editedQuestion, setEditedQuestion] = useState<MultipleChoiceQuestion>(question);
    const [error, setError] = useState<string | null>(null);

    const addChoice = () => {
        const newChoice = {id: Date.now().toString(), option: ''};
        setEditedQuestion({
            ...editedQuestion,
            choices: [...editedQuestion.choices, newChoice],
        });
    };

    const updateChoice = (id: string, option: string) => {
        setEditedQuestion({
            ...editedQuestion,
            choices: editedQuestion.choices.map(c => c.id === id ? {...c, option} : c),
        });
    };

    const deleteChoice = (id: string) => {
        setEditedQuestion({
            ...editedQuestion,
            choices: editedQuestion.choices.filter(c => c.id !== id),
        });
    };

    const handleSave = () => {
        if (!editedQuestion.title || !editedQuestion.question || editedQuestion.choices.length < 2 || !editedQuestion.correct_choice) {
            setError('Please fill all required fields and provide at least two choices.');
            return;
        }
        onSave(editedQuestion);
    };

    return (
        <div>
            <h2>Edit Multiple Choice Question</h2>
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
                className="form-control mt-2 mb-3"
                type="number"
                value={editedQuestion.points}
                onChange={e => setEditedQuestion({...editedQuestion, points: Number(e.target.value)})}
                placeholder="Points"
                required
            />
            <h3>Choices:</h3>
            {editedQuestion.choices.map(choice => (
                <div key={choice.id}>
                    <textarea
                        className="form-control"
                        value={choice.option}
                        onChange={e => updateChoice(choice.id, e.target.value)}
                        placeholder="Choice text"
                    />
                    <div className="form-check my-2">
                    <label className="form-check-label">
                        <input
                            className="form-check-input"
                            type="radio"
                            checked={editedQuestion.correct_choice === choice.id}
                            onChange={() => setEditedQuestion({...editedQuestion, correct_choice: choice.id})}
                        />
                        Correct Answer</label>
                        </div>

                    <button className="btn btn-danger mt-4" onClick={() => deleteChoice(choice.id)}>Delete</button>
                    <hr/>
                    <br/>
                </div>
            ))}
            <div>
                <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
                <button onClick={addChoice} className="btn btn-info mx-2">Add Choice</button>
                <button onClick={handleSave} className="btn btn-primary">Save Question</button>

                <br/>
            </div>
        </div>
    );
}
