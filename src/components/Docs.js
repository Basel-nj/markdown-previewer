import React, { Fragment, useEffect, useState } from "react";

function Docs() {
   const [syntax, setSyntax] = useState([]);
   async function getDocs() {
      fetch("/markdown.json")
         .then((response) => response.json())
         .then((data) => setSyntax(data.basic_syntax))

         .catch((error) => console.error("Error:", error));
   }
   useEffect(() => {
      getDocs();
      console.log("syntax", syntax);
   }, []);

   return (
      <div className="docs">
         {syntax.length > 0 &&
            syntax.map((syntax) => {
               return (
                  <div className="syntax" key={syntax.name}>
                     <h2>{syntax.name}</h2>
                     <p>{syntax.description}</p>
                     {
                        //examples
                        syntax.examples.map((example, index) => {
                           return (
                              <div className="example" key={example.markdown}>
                                 <h3>Example {index + 1} :</h3>
                                 <h4>- markdown</h4>
                                 <code>{example.markdown}</code>
                                 <h4>- html</h4>
                                 <code>{example.html}</code>
                              </div>
                           );
                        })
                     }
                     {
                        //examples
                        syntax.additional_examples &&
                           syntax.additional_examples.map((example, index) => {
                              return (
                                 <div className="example" key={example.html}>
                                    <h3>{example.name}</h3>
                                    <p>{example.description}</p>
                                    <h4>- markdown</h4>
                                    <code>{example.markdown}</code>
                                    <h4>- html</h4>
                                    <code>{example.html}</code>
                                 </div>
                              );
                           })
                     }
                  </div>
               );
            })}
         <div className="docs"></div>
      </div>
   );
}

export default Docs;
