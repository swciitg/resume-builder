// LatexContext.js
import { createContext, useContext, useState } from 'react';

const LatexContext = createContext();

export const LatexProvider = ({ children }) => {
    const [latexCodeE, setLatexCode] = useState('');

    return (
        <LatexContext.Provider value={{ latexCodeE, setLatexCode }}>
            {children}
        </LatexContext.Provider>
    );
};

export const useLatex = () => useContext(LatexContext);
