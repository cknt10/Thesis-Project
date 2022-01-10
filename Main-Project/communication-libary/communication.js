
var pending = false;

const eventBusGetVariations = () => {
    
    if(!pending){
        console.log("try fetching a test");
        return new Promise(async (resolve, reject) => {

            try {
                
                pending=!pending;
        
                fetch('localhost:7999/getVariations').then((response) => {
                    
                    response.json();
                    
                    var event = new CustomEvent("event-bus:get-variations", { "detail": "Example of an event" });
                    document.dispatchEvent(event);
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
            finally{

                pending=!pending;
            }

        });
    
        } else {
    
            // mache nichts
        }
};
