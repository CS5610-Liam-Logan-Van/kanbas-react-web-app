import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const findAllQuizzes = async (courseId: any) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${courseId}`);
  return response.data;
};

export const findQuizById = async (quizId: any) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/quiz/${quizId}`
  );
  return response.data;
};

export const createQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: any) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return response.data;
};


// Might need something for updating later?
//   const totalPoints = quiz.questions.reduce(
//     (acc: any, q: any) => acc + q.points,
//     0
//   );
//   quiz.points = totalPoints;
