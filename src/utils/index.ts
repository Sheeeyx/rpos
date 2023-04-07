


export function queryAncestors(array:any, current:any, parentId:any, id = 'id') {
    const result = [current]
    const hashMap = new Map()
    array.forEach((item:any) => hashMap.set(item[id], item))
  
    const getPath = (current:any) => {
      const currentParentId = hashMap.get(current[id])[parentId]
      if (currentParentId) {
        result.push(hashMap.get(currentParentId))
        getPath(hashMap.get(currentParentId))
      }
    }
  
    getPath(current)
    return result
  }
  