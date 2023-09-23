import { SafeUser } from '@/types'
import { create } from 'zustand'

interface UserLoginStore {
  currentUser?: SafeUser | null
  setCurrentUser: (data: SafeUser) => void
}

const useUserLogin = create<UserLoginStore>((set) => ({
  currentUser: null, // Initialize currentUser to null or any default value you prefer
  setCurrentUser: (data: SafeUser) => set({ currentUser: data }), // Pass an object with the currentUser property
}))

export default useUserLogin
