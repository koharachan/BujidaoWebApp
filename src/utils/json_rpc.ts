import { useUserInfoStore } from '@/stores/userInfoStore'

// dev环境使用 /
const API_ADDRESS = import.meta.env.DEV ? '/json_rpc/' : import.meta.env.VITE_API_ADDRESS

async function reFetch(url: any, options: any, retryCount = 3): Promise<any> {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await response.json()
  } catch (error) {
    if (retryCount > 0) {
      return reFetch(url, options, retryCount - 1)
    }
    throw error
  }
}

function jsonRpc(method: any, params: any = {}, id = 0): Promise<any> {
  const userInfoStore = useUserInfoStore()
  const token = userInfoStore.getToken()
  if (token) {
    params.token = token
  }
  return reFetch(API_ADDRESS, {
    method: 'Post',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method,
      params,
      id,
    }),
  })
}

export { jsonRpc }
