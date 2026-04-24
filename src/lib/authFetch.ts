export const authFetch = (url: string, options: any = {}) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 MUST be backticks
      ...(options.headers || {}),
    },
  });
};