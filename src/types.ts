export type Headers = Record<string, string | string[]>

export type Request = {
  url: string
  method: string
  headers?: Headers
  body?: string | Record<string, any>
  resourceType: string
}

export type Response = {
  url: string
  status: number
  headers?: Headers
  ttfb: (() => number) | number
  body?: string | Record<string, any>
}

type ResponseFunc = (req: Request) => Promise<any>
export type DefResponse = Partial<Response> | ResponseFunc

type ListItem = string | string[]

type List = ListItem[]

// @todo generic, do I really need it?
export interface Storage {
  get: (key: string) => Promise<{ request: Request, response: Response }>
  set: (key: string, data: { request: Request, response: Response }) => Promise<void>
  has: (key: string) => Promise<boolean>
  setWd: (wd: string) => void
}

export type Naming = {
  query?: {
    whitelist?: string[]
    blacklist?: string[]
  }
  body?: {
    whitelist?: List
    blacklist?: List
  }
}

export type Capture = {
  urls: string[]
  methods: string[]
}

export type Pass = {
  urls: string[]
  methods: string[]
}

export type Interceptor = {
  name?: string // from keys of UserInterceptor. If no name, hostname+path is used
  url: string
  methods: Set<string>
  resourceTypes: Set<string>
  query?: Record<string, any>
  body?: Record<string, any>
  pass: boolean
  naming?: Naming
  response?: DefResponse
}

export type UserInterceptor = {
  name?: string
  url?: string
  methods?: Set<string> | string
  resourceTypes?: Set<string> | string
  query?: Record<string, any>
  body?: Record<string, any>
  pass?: boolean
  naming?: Naming
  response?: DefResponse
}

export type Options = {
  interceptors: Record<string, Interceptor>
  ci: boolean
  response?: Response
  skipResponseHeaders: string[]
  awaitConnectionsOnStop: boolean
  wd?: string
}

export type UserOptions = {
  page?: any
  wd?: string
  interceptors?: Record<string, UserInterceptor>
  skipResponseHeaders?: string[]
}

export type Meta = {
  request: Request
  interceptor: Interceptor
}

export type DriverRequest = {
  request: Request
  abort: Function
  next: Function
  respond: (data: any, interceptor: Interceptor) => void
}

export type DriverResponse = {
  request: Request
  response: Response
  __meta: Meta
}

export type OnRequestHandler = (arg: DriverRequest) => void

export type OnResponseHandler = (arg: DriverResponse) => void

export interface Driver {
  setRequestInterception: (switchOn: boolean) => void
  onRequest: (fn: OnRequestHandler) => Function
  onResponse: (fn: OnResponseHandler) => Function
  onClose: (fn: any) => Function
}

export type Spy = {
  called: boolean
  calledOnce: boolean
  callCount: number
  dismiss: () => void
}
export type SpyTuple = [Interceptor, Spy]
