const apiUrl = "http://localhost:3003";

const getToken = () => localStorage.getItem("token");
// console.log("Token:", getToken());

export const getTodos = async () => {
  const token = getToken()
  if (!token) {
    throw new Error("No token found. Please log in first.");
  }

  try {
    const response = await fetch(`${apiUrl}/todos`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    });

    // console.log("Response Status:", response.status);
    const responseBody = await response.text();
    // console.log("Response Body:", responseBody);

    if(!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch todos.");
    }

    const data = JSON.parse(responseBody);
    // console.log("API response:", data);
    return data
  } catch (error) {
    // console.error("Error in getTodos:", error.message);
    throw error;
  }
};

export const addTodo = async (title, description) => {
  console.log("Payload being sent:", {title,description});
  try {
    const response = await fetch(`${apiUrl}/todos`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to add todos.");
    }
    
    const data = await response.json();
    // console.log("API response:", data);
    return await data;
  } catch (error) {
    throw new Error("Failed to add todo.");
  }
};

export const updateTodo = async (id, title, description) => {
  try {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ title, description }),
    });
    
    return await response.json();
  } catch (error) {
    throw new Error("Failed to update todo.");
  }
};

export const deleteTodo = async (id) => {
  try {
    await fetch(`${apiUrl}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    });
  } catch (error) {
    throw new Error("Failed to delete todo.");
  }
};

export const deleteAllTodos = async () => {
  try {
    await fetch(`${apiUrl}/todos`, {
      method: "DELETE",
      headers: {
       Authorization: `Bearer ${getToken()}`,
      }
    });
  } catch (error) {
    throw new Error("Failed to delete all todos.");
  }
};
