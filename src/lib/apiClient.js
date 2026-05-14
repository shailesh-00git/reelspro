export async function apiClient(endpoint, method, body) {
  try {
    const res = await fetch(endpoint, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Something went wrong");
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}

export default apiClient;
