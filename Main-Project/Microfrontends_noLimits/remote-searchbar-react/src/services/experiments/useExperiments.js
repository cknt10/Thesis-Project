import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registered, update } from './store/actions';

const useExperiments = () => {

    const dispatch = useDispatch();
    const { init, experiments } = useSelector((state) => state.experiments);

    useEffect(() => {

        if(!init) {

            try{
                
                var myHeaders = new Headers();
                myHeaders.append("DY-API-Key", "b19202c4997c857541d3bd9f972bad35195fa0acb4aa9474d74e28f8995b0d65");
                myHeaders.append("Content-Type", "application/json");
        
        
                var raw = JSON.stringify({
                "selector": {
                    "names": [
                    "CK: A/B Test Bubble"
                    ]
                },
                "user": {},
                "session": {},
                "context": {
                    "page": {
                    "type": "HOMEPAGE",
                    "location": "https://example.org",
                    "locale": "en_US",
                    "data": []
                    },
                    "device": {
                    "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
                    "ip": "54.100.200.255"
                    }
                },
                "options": {
                    "isImplicitPageview": false,
                    "returnAnalyticsMetadata": false
                }
                });
        
                var requestOptions = {
                method: 'POST',
                //mode: 'no-cors',
                headers: myHeaders,
                body: raw
                };
        
        
                fetch("https://direct.dy-api.com/v2/serve/user/choose", requestOptions)
                .then(response => response.json())
                .then(result => {
                    dispatch(update(result));
                })
                .catch(error => console.log('error', error));
        

        
                dispatch(registered());
            } catch (e){
                console.error("searchbar was not able to react on variation", e);
            }
        }
    }, [init]);

    return experiments;
};

export default useExperiments;