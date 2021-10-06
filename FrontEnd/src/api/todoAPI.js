import { apiDelete, apiGet, apiPatch, apiPost } from ".";
import { API_URL } from "./constant";

export const getAllTodosAPI = () => apiGet(`${API_URL}/todo/get-todos`);

export const removeTodoAPI = (id) =>
  apiDelete(`${API_URL}/todo/delete-todo/${id}`);

export const taskCompleted = (id, data) =>
  apiPatch(`${API_URL}/todo/compete-todo/${id}`, data);

export const editTodo = (id, data) =>
  apiPatch(`${API_URL}/todo/update-todo/${id}`, data);

export const getMostProductiveDays = () =>
  apiGet(`${API_URL}/todo/most-productive-day`);
