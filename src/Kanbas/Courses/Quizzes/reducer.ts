import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as {
    _id: string;
    title: string;
    quiz_type: string;
    points: number;
    assignment_group: string;
    shuffle_answers: string; //Boolean? But can be String for Yes/No
    time_limit: number;
    multiple_attempts: string; //Boolean? But can be String for Yes/No
    show_correct_answers: string;
    access_code: string;
    one_question_at_a_time: string;
    webcam_required: string; //Boolean? But can be String for Yes/No
    lock_questions_after_answering: string; //Boolean? But can be String for Yes/No
    due_date: Date;
    available_date: Date;
    until_date: Date;
    published: boolean;
  }[],
  quiz: {
    title: "New Quiz",
    quiz_type: "Graded Quiz",
    points: 0,
    assignment_group: "Quizzes",
    shuffle_answers: "Yes",
    time_limit: 20,
    multiple_attempts: "No",
    show_correct_answers: "Immediately",
    access_code: "",
    one_question_at_a_time: "Yes",
    webcam_required: "No",
    lock_questions_after_answering: "No",
    due_date: new Date(),
    available_date: new Date(),
    until_date: new Date(),
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes];
    },

    removeQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },

    editQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return { ...quiz, ...action.payload };
        } else {
          return quiz;
        }
      });
    },
  },
});

export const { addQuiz, removeQuiz, editQuiz, setQuiz, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
