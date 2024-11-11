/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useTokenStore } from "@/features/auth/hooks/use-token-store";
import { API_ENDPOINT } from "./constants";

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  isJSON?: boolean;
};

function buildUrlWithParams(
  url: string,
  params?: RequestOptions["params"],
): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  );
  if (Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(
    filteredParams as Record<string, string>,
  ).toString();
  return `${url}?${queryString}`;
}

async function fetchApi<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    cookie,
    params,
    cache = "no-store",
    next,
    isJSON = true,
  } = options;
  const fullUrl = buildUrlWithParams(`${API_ENDPOINT}${"/api"}${url}`, params);

  const parseBody = () => {
    if (body) {
      return isJSON ? JSON.stringify(body) : body;
    }

    return undefined;
  };

  const doFetch = () => {
    const accessToken = useTokenStore.getState().accessToken;
    return fetch(fullUrl, {
      method,
      headers: {
        ...(isJSON
          ? { "Content-Type": "application/json", Accept: "application/json" }
          : {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
        ...(cookie ? { Cookie: cookie } : {}),
      },
      body: parseBody(),
      credentials: "include",
      cache,
      next,
    });
  };

  let response = await doFetch();

  if (response.status === 401) {
    // refreshing access token
    const refreshResponse = await fetch(`${API_ENDPOINT}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    const refreshData: { access_token: string } = await refreshResponse.json();

    if (refreshData.access_token) {
      useTokenStore.getState().updateAccessToken(refreshData.access_token);
      response = await doFetch();
    } else {
      throw new Error("unauthorized");
    }
  }

  if (!response.ok) {
    const message = (await response.json()).message || response.statusText;
    if (typeof window !== "undefined") {
      toast.error(message);
    }
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "GET" });
  },
  post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "POST", body });
  },
  put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PUT", body });
  },
  patch<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PATCH", body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "DELETE" });
  },
};
