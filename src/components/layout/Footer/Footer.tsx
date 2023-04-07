import React from 'react';
import "./Footer.sass";

interface propTypes{
    copyright:string
}

export const GlobalFooter : React.FC<propTypes> = ({  copyright }) => {
    
  return (
    <footer className="globalFooter footer">
        {copyright && <div className="copyright">{copyright}</div>}
    </footer>
  );
};
