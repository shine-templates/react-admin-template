import { useSelector, shallowEqual } from 'react-redux'

const usePermission = (): any => {
  const { auth } = useSelector((state: RootState) => state.authSlice, shallowEqual)
  const HasPermission = (permission: string): boolean => {
    return process.env.NODE_ENV === 'development' ? true : auth.includes(permission)
  }
  return { HasPermission }
}

export default usePermission
