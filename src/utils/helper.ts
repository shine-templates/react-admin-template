import conf from '@/assets/conf'
export const trans_tree = (jsonData: Array<any>) => {
  var result: Array<any> = [],
    temp = {},
    len = jsonData.length

  for (var i = 0; i < len; i++) {
    temp[jsonData[i]['privilegeId']] = jsonData[i]
  }
  for (var j = 0; j < len; j++) {
    var currentElement = jsonData[j]
    var tempCurrentElementParent = temp[currentElement['parentId']]
    if (tempCurrentElementParent) {
      if (!tempCurrentElementParent['children']) {
        tempCurrentElementParent['children'] = []
      }
      tempCurrentElementParent['children'].push(currentElement)
    } else {
      result.push(currentElement)
    }
  }

  return result
}

export const nest = (items: any[], privilegeId = null, link = 'parentId') =>
  items.filter(item => item[link] === privilegeId).map(item => ({ ...item, children: nest(items, item.privilegeId) }))

// 导出Blob excel
export const exportExcel = async <T>(bodyParams: T, Fun) => {
  try {
    await Fun({
      ...bodyParams,
    })
  } catch (error) {
    const e: any = error
    const aBlob = new Blob([e])
    let blobUrl = window.URL.createObjectURL(aBlob)
    const aElement = document.createElement('a') // 创建a标签
    aElement.href = blobUrl //设置a标签路径
    aElement.download = '统计excel.xlsx'
    aElement.click()
    window.URL.revokeObjectURL(blobUrl)
  }
}

// 判断权限是否存在
export const isShow = value => {
  if (window.sessionStorage.getItem('persist:root')?.indexOf(value) !== -1) {
    return true
  } else {
    return false
  }
}

export type FormatSelect = {
  label: string
  value: string | number
  key?: string | number
}

export const formatSelect = <T>(data: Array<T>, keys: string[]): Array<FormatSelect> => {
  if (Array.isArray(data)) {
    if (data.length > 0) {
      return data.map(item => {
        return {
          label: item[keys[0]],
          value: item[keys[1]],
          key: item[keys[0]],
        }
      })
    } else {
      return []
    }
  } else {
    return []
  }
}

const current = JSON.parse(sessionStorage.getItem(conf.SESSION_KEY + 'LoginOrgList') as string)
export const initOrgId = (current && current[0].value) || ''
