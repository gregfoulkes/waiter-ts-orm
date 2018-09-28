 function waiterAxiosFunction() {

    function getAllDays() {
        try {

          const response = axios.get("/api");
    
          return response;
        } catch (error) {
          alert(error);
        }
      }

      function waiterNameRoute() {
        try{

        const response = axios.get("/api/waiter/" + waiterName);
          
        return response;
      } catch (error) {
        alert(error);
      }

      }
    
      return {
        getAllDays
      }

}