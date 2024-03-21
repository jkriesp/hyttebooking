async function callApi(token: string, endpoint: string, method: string = "GET", body: unknown = null): Promise<unknown> {
  const headers: Headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  if (body) {
    headers.append("Content-Type", "application/json");
  }

  const response: Response = await fetch(`http://localhost:8080${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  return response.json();
}

export { callApi };