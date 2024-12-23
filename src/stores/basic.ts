import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SetState } from './store.interface';
import { IBasicDetailsItem, IBasicDetailsStore } from './basic.interface';
import resumeData from '@/helpers/constants/resume-data.json'; // Fall-back data
import userDetailsData from '../functions/userDetails'; // User details from localStorage

const onChangeText = (set: SetState<IBasicDetailsStore>) => (values: IBasicDetailsItem) =>
  set({ values });

// Define the initial state or fallback data
const initialState = userDetailsData?.resumeData?.basics || resumeData.basics;

console.log('User basic details are:', initialState);

// Add a setback function to revert the state
const setback = (set: SetState<IBasicDetailsStore>) => () => {
  // Revert to the initial state (or fallback data)
  set({ values: initialState });
};

export const useBasicDetails = create<IBasicDetailsStore>()(
  persist(
    (set) => ({
      values: initialState, // Initialize with the user data or fall-back
      reset: onChangeText(set),
      setback: setback(set), // Add the setback method
    }),
    { name: 'basic' }
  )
);
