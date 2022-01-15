import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registered, update } from './store/actions';

const useExperiments = () => {

    const dispatch = useDispatch();
    const { init, experiments } = useSelector((state) => state.experiments);

    useEffect(() => {

        if(!init) {

            //window.JSLib = window.JSLib || []; <- Max
            window.JSLib.push(["init"]); //von Christian dazu
            window.JSLib.push(['initApp', 'react-serach', (experimentData) => {
                dispatch(update(experimentData));
            }]);
    
            dispatch(registered());

            // test 
            // dispatch(update({
            //     experiment: "123",
            //     variation: "321"
            // }));
        }
    }, [init]);

    return experiments;
};

export default useExperiments;