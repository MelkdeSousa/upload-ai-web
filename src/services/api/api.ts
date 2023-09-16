export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type ContentTypes = 'application/json' | 'multipart/form-data'

export const createApi = (baseUrl: string) => async <R = unknown>(endpoint: string, method: HttpMethods = 'GET', body?: BodyInit, contentType?: ContentTypes): Promise<R> => {
    const {origin} = new URL(baseUrl)

    const headers = new Headers()

    if (contentType)
        headers.append('Content-Type', contentType)

    const response = await fetch(origin + endpoint, {
        method,
        headers,
        body,
    })

    return await response.json()
}