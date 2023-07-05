const TOKEN_NAME = "token";

export const setTokenStorage = (token: string) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getTokenStorage = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const deleteTokenStorage = () => {
  localStorage.removeItem(TOKEN_NAME);
};
