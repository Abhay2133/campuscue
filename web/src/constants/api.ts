export const getAnswersURL = (id: string) => `${process.env.NEXT_PUBLIC_BASE_URL}/api/answers/${id}`;
export const getPostsURL = () => `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`;
export const getProfile = () => `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`;
export const getQuestionById = (id:string) => `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/${id}`
export const getLatestQuestions = () => `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/latest`;