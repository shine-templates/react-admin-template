interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
}

declare namespace API {
  interface Res<T> {
    code: string
    data: T
    msg: string
  }

  interface ListData<T> {
    records: T[]
    total: number
    [key: string]: any
  }

  type ListRes<T> = Res<ListData<T>>

  interface CommonPaginationParams {
    pageNum: number
    pageSize: number
  }
}

declare namespace TABLE {
  interface DSource<U> {
    list: U[]
    total: number
  }

  interface ResData<U> {
    code?: string
    list: T
    msg?: string
  }

  interface Res<U> {
    total: number
    list: T
    [key: string]: any
  }
}

declare namespace FILEITEM {
  interface item {
    fileId: string
    fileName?: string
    fileUrl: string
    [propsName: string]: any
  }
}

declare namespace Window {
  // FDZM_CONFIF?: object
  interface Window {
    FDZM_CONFIF?: object
  }
}

declare var Blob: {
  prototype: Blob
  new (): Blob
}

declare module 'react-file-viewer'
declare module 'custom-error'
declare module 'nprogress'
