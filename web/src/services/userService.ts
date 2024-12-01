export const doLogin = (email: string, password: string) =>
  fetch((process.env.NEXT_PUBLIC_BASE_URL || "") + "/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
export const doSignup = (name:string, email: string, password: string) =>
  fetch((process.env.NEXT_PUBLIC_BASE_URL || "") + "/api/users/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

