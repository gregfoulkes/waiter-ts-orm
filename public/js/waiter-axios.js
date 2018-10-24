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

       return axios.post("/api/waiter/" + shiftData.username, {
         shift: shiftData
       });

     } catch (error) {

       alert(error);
     }
   }

   function waiterNameLoginApiRoute(loginData) {

    try {

       let result = axios.post("/api/login", {
         login: loginData
       });

       return result

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

   function registerApiRoute(registerData) {

     try {
       const response = axios.post("/api/register", {
         register: registerData
       });

       return response;

     } catch (error) {

       alert(error)
     }
   }

   return {
     getAllDays,
     waiterNameApiGetRoute,
     waiterNameApiPostRoute,
     getShiftsForDaysApiRoute,
     waiterNameLoginApiRoute,
     registerApiRoute
   }

 }