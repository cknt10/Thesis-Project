window.JSLib = window.JSLib || [];
window.JSLib = (function (window, document, taskRunner){
	"use strict";
    
	const version = "0.1";
    
	let JSLibInstance;
    let instanceInitialized = false;
    let pending = false;
    const apps = [];

    document.addEventListener('voodoo-get-variations', (event) => {

        console.log("Libary got Event", event, apps);
        apps.map((app) => {
            try {
                
                console.log("callback of",app.appId);
                app.callback(event);
            } catch (error) {
                console.log("callback by custom event not possible",error);
            }
        });
    });
    
	const run = (param) => {
        console.log("run", typeof JSLibInstance[param[0]] === "function", param);
		
		if(typeof JSLibInstance[param[0]] === "function"){
    		
			return JSLibInstance[param[0]](param);
    	} else {
    		
    		// function is not defined
    		console.log(">>> [JSLib] function is not defined");
    	}
	};
    
	const JSLib = function() {
		
		const self = this;
        
		self.init = function(params){
            
            if(Array.isArray(taskRunner) && taskRunner.length>0){

                for(var i = 0; i < taskRunner.length; i++){
                    
                    let key = taskRunner[i][0];
                    
                    console.log(">>> [JSLib] this task was defined before initialization", key);
                    console.log(">>> [JSLib] trying reprocess pending tasks...", key);
    
                    try{
    
                        self[key](taskRunner[i]);
                    } catch(er) {
                        console.error(key, ">>> [JSLib:FAILED] could not be reprocessed, check function call in your components");
                    }
                }
                // clear task array
                taskRunner = [];
            }

            // define you listener here
            console.log(">>> [JSLib] running initialization");
            params.shift();
            const [ appId, callback ] = params;
            console.log("index of",apps.indexOf(appId) !== -1,apps.indexOf(appId));
            console.log("apps before, reference",appId,callback);
            if(apps.indexOf(appId) === -1){

                apps.push({
                    appId: appId,
                    callback: callback
                });
            }

            if(!instanceInitialized){

                instanceInitialized = true;
            }
		};
        
        // define more functions
		self.add = function(param) {
            const key = param[0];
            const { name, callback } = param[1];
            
            console.log(">>> [JSLib] add function", key, name, typeof callback);
		};
        
        // define more functions
		self.reset = function(param) {
            console.log(">>> [JSLib] reset function");
		};
    
        self.removeApp = (params) => {
            if (apps.indexOf(appId) !== -1) {
                splice(index, 1);
              }
        }

        self.eventBusGetVariations = (params) => {
        
            if(!pending){
                
                pending=!pending;
    
                return new Promise(async (resolve, reject) => {
        
                    try {
                
                        fetch('http://localhost:7999/getVariations')
                        .then((response) => response.json()
                            .then(response =>{
                                
                                console.log("Libary", response);
                                
                                var event = new CustomEvent("voodoo-get-variations", { "detail": response });
                                document.dispatchEvent(event);
                                resolve;
                            })
                        );
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
        
	};
    
	// initialize iridion 
	JSLibInstance = new JSLib();
    
	return {
        push: function(param){
            
            var key = param[0];

            console.log(">>> [JSLib] push", param);
            
            if(key === "init" || instanceInitialized){
                
                run(param);
                
            // push into task array if JSLib is not initialized
            // all tasks will be executed in the init function
            } else {
                
                taskRunner.push(param);
            }
        }
        
    }
})(window, document, window.JSLib || []);