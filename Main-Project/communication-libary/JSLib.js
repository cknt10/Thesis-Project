window.JSLib = window.JSLib || [];
window.JSLib = (function (window, document, taskRunner){
	"use strict";
    
	const version = "0.1";
    
	let JSLibInstance;
    let instanceInitialized = false;
    let pending = false;
    const apps = [];
    const experiments = [];

    document.addEventListener('voodoo-get-variations', (event) => {

        console.log("Libary got Event", event, apps);
        apps.map((app) => {
            try {
                if(event.detail && event.detail.variants){
                    event.detail.variants.appId = app.appId;
                    app.callback(event.detail.variants);           
                }
                //app.callback(event);
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
        
		self.init = function(){
            
            console.log(">>> [JSLib] running initialization");
            
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
            
            if(!instanceInitialized){
                
                instanceInitialized = true;
                this.update();
            }

		};

                // define more functions
        self.add = function(params) {
            params.shift();
            const [ appId, experimentName, callback ] = params;
            console.log("apps before, reference",appId,callback);
            if(apps.indexOf(appId) === -1){

                apps.push({
                    appId: appId,
                    callback: callback
                });

                experiments.push(experimentName);
            }
            
            console.log(">>> [JSLib] add function", appId, typeof callback);
        };
    
        self.removeApp = (params) => {
            params.shift();
            const [ appId ] = params;
            if (apps.indexOf(appId) !== -1) {
                splice(apps.indexOf(appId), 1);
              }
        }

        self.update = (params) => {
        
            if(!pending){
                
                pending=!pending;
    
                return new Promise(async (resolve, reject) => {
        
                    try {
                        
                        if(params && params.length > 1){

                            experiments.push(params[1]);
                            console.log("param unso", JSON.stringify(experiments));
                        }

                        const config = {
                            method: 'POST',
                            headers: {
                                'Content-Type': "text/plain"
                            },
                            body: JSON.stringify(experiments)
                        }

                        fetch(
                            "http://localhost:7999/variations", config
                        )
                        .then((response) => response.json()
                            .then(response =>{
                                
                                console.log("Libary", response);
                                
                                var event = new CustomEvent("voodoo-get-variations", { "detail": response });

                                document.dispatchEvent(event);
                                resolve;
                            })
                        );
                    } catch (error) {
                        console.log("failed Fetch", error)
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