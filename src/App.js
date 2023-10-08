import "./App.css";
import React, { useState } from "react";
import { marked } from "marked";
import { Fragment } from "react";
import { useEffect } from "react";
import useLocalStorege from "./hooks/useLocalStorege";
import Docs from "./components/Docs";

const App = () => {
   const [code, setCode] = useState("");
   const [compiled, setCompiled] = useState("");
   const [hide, hidePreview] = useState(true);
   const [showDocs, setShowDocs] = useState(false);
   const storedData = useLocalStorege;

   useEffect(() => {
      if (setCode) {
         setCode(storedData());
         setCompiled(marked.parse(storedData()));
      }
   }, []);

   useEffect(() => {
      storedData(code);
   }, [code]);

   const openMD = () => {
      console.log(0);
      hidePreview(true);
      setShowDocs(false);
   };

   const openPreview = () => {
      console.log(0);
      hidePreview(false);
      setShowDocs(false);
   };
   const openDocs = () => {
      hidePreview(true);
      setShowDocs(true);
   };

   const handleChange = (e) => {
      setCode(e.target.value);
      setCompiled(marked.parse(e.target.value));
   };

   return (
      <Fragment>
         <h1>MarkDown Previewer React App</h1>
         <div className="container">
            <div className="btns">
               <button
                  onClick={openMD}
                  className={hide & (showDocs === false) ? "btn" : null}
               >
                  MarkDown
               </button>
               <button onClick={openPreview} className={!hide ? "btn" : null}>
                  Preview
               </button>
               <button onClick={openDocs} className={showDocs ? "btn" : null}>
                  Docs
               </button>
            </div>

            {showDocs ? (
               <div>
                  <Docs />
               </div>
            ) : hide ? (
               <div>
                  <textarea onChange={handleChange} value={code} />
               </div>
            ) : (
               <div>
                  <textarea value={compiled} />
               </div>
            )}
         </div>
      </Fragment>
   );
};

export default App;
