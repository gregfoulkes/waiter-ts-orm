 function waiterAxiosFunction() {

   function getAllDays() {
     try {

       const response = axios.get("/api");

       return response;
     } catch (error) {
       alert(error);
     }
   }

   function waiterNameApiGetRoute(waiterName) {
     try {

       const response = axios.get("/api/waiter/" + waiterName);

       return response;
     } catch (error) {
       alert(error);
     }

   }

   function waiterNameApiPostRoute(shiftData) {
     try {
       const response = axios.post("/api/waiter/" + shiftData);

       return response;
     } catch (error) {
       alert(error);
     }



   }

   return {
     getAllDays,
     waiterNameApiGetRoute,
     waiterNameApiPostRoute
   }

 }