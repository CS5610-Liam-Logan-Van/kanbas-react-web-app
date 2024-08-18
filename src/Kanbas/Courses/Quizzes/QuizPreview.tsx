import FillInBlankDisplay from "./QuizQuestionDisplays/FillInBlankDisplay";
import MultipleChoiceDisplay from "./QuizQuestionDisplays/MultipleChoiceDisplay";
import TFDisplay from "./QuizQuestionDisplays/TFDisplay";

export default function QuizPreview() {
  return (
    <div>
      <h1>Quiz Preview</h1>
        <FillInBlankDisplay />
        <MultipleChoiceDisplay/>
      <TFDisplay/>
    </div>
  );
}
