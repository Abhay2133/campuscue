export type AnswerType = {
  _id: string;
  body: string;
  question: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  vote: number;
  createdAt: string;
  updatedAt: string;
};

export type QuestionType = {
  _id: string;
  title: string;
  body: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  votes: number;
  createdAt: string;
  updatedAt: string;
};

export interface PostType {
  _id: string;
  title: string;
  body: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  likes: number;
  images: string[];
  links: string[];
  createdAt: string;
  updatedAt: string;
}
