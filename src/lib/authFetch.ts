export const authFetch = (url: string, options: any = {}) => {
  const token = localStorage.getItem("token");

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 THIS FIXES 401
      ...(options.headers || {}),
    },
  });
};
