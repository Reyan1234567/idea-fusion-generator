import { create } from "zustand";

export const useUserStore = create((set) => ({
  id: 0,
  setId: (newId: number) => set({ id: newId }),
  username: "",
  setUsername: (newUsername: string) => set({ username: newUsername }),
  profilePic: "",
  setProfilePic: (newProfilepic: number) => set({ profilePic: newProfilepic }),
  fullName: "",
  setFullName: (newFullName: string) => set({ fullName: newFullName }),
}));

// login action must kinda return a user info thing for the login component
// so we can set it as a global thing...

// the sidebar must have a account info(signout, account edit thing going on...)

// the discuss thing must work some way of doing it...(top priority)

// the login must have a forgot password thing
