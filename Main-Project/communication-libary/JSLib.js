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
        console.log("Libary got Apps", apps);
        apps.map((app) => {
            try {
                
                console.log("callback of",app.appId);
                app.callback(event);
            } catch (error) {
                console.log("callback by custom event not possible",error);
            }
        });
    });

    const eventBusGetVariations = () => {
        
        if(!pending){
            console.log("try fetching a test");
            pending=!pending;

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
    
                    pending=!pending;
                }
    
            });
        
            } else {
        
                // mache nichts
            }
    };
    
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
        
		self.init = function(param){
            
			for(var i = 0; i < taskRunner.length; i++){
                
                let key = taskRunner[i][0];
                
                console.log(">>> [JSLib] this task was defined before initialization", key);
			}
            
            // define you listener here
            console.log(">>> [JSLib] running initialization");

            
			// clear task array
			taskRunner = [];
            
            instanceInitialized = true;
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

        self.initApp = (params) => {
            console.log("params1",params);
            params.shift();
            console.log("params2",params);
            const [ appId, callback ] = params;
            console.log("index of",apps.indexOf(appId) !== -1,apps.indexOf(appId));
            console.log("apps before, reference",appId,callback);
            if(apps.indexOf(appId) === -1){

                apps.push({
                    appId: appId,
                    callback: callback
                });
            }
            console.log("apps after",apps);
        },
    
        self.removeApp = (params) => {
            if (apps.indexOf(appId) !== -1) {
                splice(index, 1);
              }
        }
        
	};
    
	// initialize iridion 
	JSLibInstance = new JSLib();
    
	return {
        push: function(param){
            
            var key = param[0];
            
            if(key === "init" || instanceInitialized){
                
                run(param);
                
            // push into task array if iridion is not initialized
            // all tasks will be executed in the init function
            } else {
                
                taskRunner.push(param);
            }
        },
        getVariations: () =>{ eventBusGetVariations() }
        
    }
})(window, document, window.iridion || []);

//this.InitApp(p)){appId, callck}

/*window.JSLib = window.JSLib || [];
window.JSLib = (function (window, document, taskRunner){
	"use strict";
    
	const version = "0.1";
    
	let JSLibInstance;
    let instanceInitialized = false;
    
	const run = (param) => {
		
		if(typeof JSLibInstance[param[0]] === "function"){
    		
			return JSLibInstance[param[0]](param);
    	} else {
    		
    		// function is not defined
    		console.log(">>> [JSLib] function is not defined");
    	}
	};
    
	const JSLib = function() {
		
		const self = this;
        
		self.init = function(param){
            
			for(var i = 0; i < taskRunner.length; i++){
                
                let key = taskRunner[i][0];
                
                console.log(">>> [JSLib] this task was defined before initialization", key);
			}
            
            // define you listener here
            console.log(">>> [JSLib] running initialization");
            
			// clear task array
			taskRunner = [];
            
            instanceInitialized = true;
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
        
	};
    
	// initialize iridion 
	JSLibInstance = new JSLib();
    
	return {
        push: function(param){
            
            var key = param[0];
            
            if(key === "init" || instanceInitialized){
                
                run(param);
                
            // push into task array if iridion is not initialized
            // all tasks will be executed in the init function
            } else {
                
                taskRunner.push(param);
            }
        }
    }
})(window, document, window.iridion || []);*/