import { useContext } from "react";
import AnimationContext from "../store/animation-context";

export const useAnimation = () => {
    const ctx = useContext(AnimationContext);
    return ctx;
}