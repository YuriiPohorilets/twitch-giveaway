const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);

  if (init?.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    let message = `Request failed with status ${response.status}`;

    try {
      const parsed = JSON.parse(text);
      if (typeof parsed?.message === "string") {
        message = parsed.message;
      }
    } catch {}

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
