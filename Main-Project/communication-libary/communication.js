
/*const VoodoO = () => {

    var pending = false;
    const apps = [];

        document.addEventListener('voodoo-get-variation', () => {

            apps.map((app) => {
                try {
                    
                    app.callback();
                } catch (error) {
                    console.log("callback by custom event not possible",error);
                }
            });
        });

    const eventBusGetVariations = () => {
        
        if(!pending){
            console.log("try fetching a test");
            return new Promise(async (resolve, reject) => {
    
                try {
                    
                    pending=!pending;
            
                    fetch('http://localhost:7999/getVariations').then((response) => {
                        
                        response.json();
                        
                        var event = new CustomEvent("voodoo-get-variations", { "detail": "Example of an event" });
                        document.dispatchEvent(event);
                        resolve;
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
    
    return {
        initApp: (appId, callback) => {
            if(apps.indexOf(appId) !== -1)
            apps.push({
                appId: appId,
                callback: callback
            });
        },
        removeApp: appId => {
            if (apps.indexOf(appId) !== -1) {
                array.splice(index, 1);
              }
        },
        eventBusGetVariations
    }
}*/
class Voodoo {

    
    constructor(){

        this.pending = false;
        this.apps = [];

        document.addEventListener('voodoo-get-variation', () => {

            apps.map((app) => {
                try {
                    
                    app.callback();
                } catch (error) {
                    console.log("callback by custom event not possible",error);
                }
            });
        });
    }
    eventBusGetVariations () {
        
        if(!this.pending){
            console.log("try fetching a test");
            this.pending=!this.pending;

            return new Promise(async (resolve, reject) => {
    
                try {
            
                    fetch('http://localhost:7999/getVariations')
                    .then((response) => response.json()
                        .then(response =>{
                            
                        console.log("Libary", response);
                            //let data = response.json();
                            
                            var event = new CustomEvent("voodoo-get-variations", { "detail": response });
                            document.dispatchEvent(event);
                            resolve;
                        })
                    );
                } catch (error) {
                    reject(error);
                }
                finally{
    
                    this.pending=!this.pending;
                }
    
            });
        
            } else {
        
                // mache nichts
            }
    };

    initApp (appId, callback) {
        if(this.apps.indexOf(appId) !== -1)
        this.apps.push({
            appId: appId,
            callback: callback
        });
    }

    removeApp (appId) {
        if (this.apps.indexOf(appId) !== -1) {
            this.splice(index, 1);
          }
    }
}

class Singleton {

    constructor() {
        this.instance = null;
    }
    
    getInstance() {
        if (this.instance === null ){
            this.instance = new Voodoo();
        }

        return this.instance;
    }
}

window.myVoodoo = {
    init() {
        return new Singleton().getInstance();
    }
}

const myVoodoO = window.myVoodoo.init();

// var myVoodoo = new Singleton().getInstance();

// myVoodoo.greet();