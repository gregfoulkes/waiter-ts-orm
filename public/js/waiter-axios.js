 function waiterAxiosFunction() {

   function getAllDays() {
     try {
      //decorator?
       const response = axios.get("/api");

       return response;
     } catch (error) {
       alert(error);
     }
   }

   function waiterNameApiGetRoute(waiterName) {
     try {

       const response = axios.get("/api/" + waiterName);

       return response;
     } catch (error) {
       alert(error);
     }

   }

   function waiterNameApiPostRoute(shiftData) {
     try {
       return axios.post("/api/" + shiftData.username, {shift:shiftData});
     // console.log(response)
       //return response;
     } catch (error) {
       alert(error);
     }

    function loginApiRoute(username) {
      try {
        
      } catch (error) {
        alert(error)
      }
    }



   }

   return {
     getAllDays,
     waiterNameApiGetRoute,
     waiterNameApiPostRoute
   }

 }