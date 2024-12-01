export const fetchLatestQuestions = () =>
  fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/questions/latest", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });

export const createNewQuestion = (title: string, body: string) =>
  fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/questions", {
    method: "post",
    body: JSON.stringify({ title, body }),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type":"application/json"
    },
  });
