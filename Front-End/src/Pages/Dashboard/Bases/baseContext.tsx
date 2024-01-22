import { useContext, createContext } from "react";
import { Base } from "../../../types";

export const BaseContext = createContext<Base | null>(null);

export const useBase = () => {
    return useContext(BaseContext);
}

export const BaseProvider = (props: {base: Base, children: any}) => {
    return (
        <BaseContext.Provider value={props.base}>
            {props.children}
        </BaseContext.Provider>
    )
}

export default BaseProvider;
