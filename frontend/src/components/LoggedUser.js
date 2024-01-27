import React from 'react'
import {
  useClearStorageUser,
  useNotifyWith,
  useStoreValue,
} from '../StoreContext'
import storageService from '../services/storage'

const LoggedUser = () => {
  const clearStorageUser = useClearStorageUser()
  const notifyWith = useNotifyWith()
  const { storageUser: user } = useStoreValue()

  const logout = async () => {
    clearStorageUser()
    storageService.removeUser()
    notifyWith('logged out')
  }

  return (
    <div>
      {user.name} logged in <button onClick={logout}>logout</button>
    </div>
  )
}

export default LoggedUser
