import React, { useContext } from "react";
import RootStore from './../RootStore';
import rootStore from './../instance';


export const RootStoreContext = React.createContext<RootStore>(rootStore);
export const useStoreContext = () => useContext(RootStoreContext);

