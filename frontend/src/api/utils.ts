/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'
import { axiosInstance } from '../utils/axios'

export const MAX_UPLOAD_FILE_SIZE = 2 * 1024 * 1024

export function endpoint<Output>(
  method: 'get' | 'delete' | 'post' | 'put' | 'patch',
  path: string
): () => Promise<Output>
export function endpoint<Output, Input extends undefined>(
  method: 'get' | 'delete' | 'post' | 'put' | 'patch',
  path: string
): (...args: Exclude<Input, undefined> extends never ? [] : [Input]) => Promise<Output>
export function endpoint<Output, Input>(
  method: 'get' | 'delete' | 'post' | 'put' | 'patch',
  path: string
): (body: Input) => Promise<Output>
export function endpoint<Output, Input>(
  method: 'get' | 'delete' | 'post' | 'put' | 'patch',
  pathBuilder: (q: Input) => string
): (body: Input) => Promise<Output>
export function endpoint<Output, Input>(
  method: 'get' | 'delete' | 'post' | 'put' | 'patch',
  urlBuilder: string | ((q: Input) => string)
): (body?: Input) => Promise<Output> {
  return async (body?: Input) => {
    const url = `${typeof urlBuilder === 'string' ? urlBuilder : urlBuilder(body!)}`

    let res: AxiosResponse
    if (method === 'get' || method === 'delete') {
      res = await axiosInstance[method](url, { params: body })
    } else {
      res = await axiosInstance[method](url, body)
    }

    return res.data as Output
  }
}

export type ApiModule = {
  readonly [key: string]: ((...args: any[]) => Promise<any>) | ApiModule
}

export type ApiInput<T extends (...args: any[]) => Promise<any>> = Parameters<T>[0]
export type ApiOutput<T extends (...args: any[]) => Promise<any>> = Awaited<ReturnType<T>>
