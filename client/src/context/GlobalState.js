import React, {createContext} from "react";
import PeliculasAPI from "../api/PeliculasAPI";
import CategoryAPI from "../api/CategoryAPI";


export const GlobalState = createContext()


export const DataProvider = ({ children }) => {
 
  const state = {
    peliculasAPI: PeliculasAPI(),
    categoryAPI: CategoryAPI()
  }

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  )
}