import { createReducer, on } from "@ngrx/store";
import { toggleTheme } from "./theme.action";

export const isDarkMode = true;
export const ThemeReducer = createReducer(
    isDarkMode,
    on(toggleTheme, (state) => !state) 
)