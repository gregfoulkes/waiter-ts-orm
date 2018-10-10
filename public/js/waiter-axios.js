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

       const response = axios.get("/api/waiter/" + waiterName);

       return response;
     } catch (error) {
       alert(error);
     }

   }

   function waiterNameApiPostRoute(shiftData) {
     try {
       return axios.post("/api/waiter/" + shiftData.username, {
         shift: shiftData
       });
     
     } catch (error) {
       alert(error);
     }
    }

     function getShiftsForDaysApiRoute() {

       try {
         const response = axios.get("/api/days");

         return response;

       } catch (error) {
         alert(error)
       }

     }

     return {
       getAllDays,
       waiterNameApiGetRoute,
       waiterNameApiPostRoute,
       getShiftsForDaysApiRoute
     }

   }