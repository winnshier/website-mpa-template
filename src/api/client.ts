type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig extends RequestInit {
  method?: Method;
  params?: Record<string, string | number | boolean | undefined>;
}

const API_BASE = import.meta.env.VITE_API_BASE || '';

const toQueryString = (params?: Record<string, string | number | boolean | undefined>) => {
  if (!params) return '';
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  return query ? `?${query}` : '';
};

export async function apiClient<T>(
  endpoint: string,
  { method = 'GET', params, headers, body, ...rest }: RequestConfig = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}${toQueryString(params)}`;

  // 自动序列化 body 为 JSON
  let processedBody: BodyInit | undefined = body;
  const requestHeaders: HeadersInit = { ...headers };

  // 只在有 body 时设置 Content-Type 并序列化
  if (body !== undefined) {
    if (typeof body === 'object' && !(body instanceof FormData) && !(body instanceof Blob)) {
      processedBody = JSON.stringify(body);
      requestHeaders['Content-Type'] = 'application/json';
    } else {
      processedBody = body as BodyInit;
    }
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: processedBody,
    ...rest
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error (${response.status}): ${text}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}
