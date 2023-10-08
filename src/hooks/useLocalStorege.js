const useLocalStorege = (value) => {
   if (value) {
      localStorage.setItem("markdown", value);
   }

   let storedData = localStorage.getItem("markdown");
   return storedData ? storedData : null;
};

export default useLocalStorege;
