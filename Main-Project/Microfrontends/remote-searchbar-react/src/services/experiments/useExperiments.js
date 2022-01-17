import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registered, update } from './store/actions';

const useExperiments = () => {

    const dispatch = useDispatch();
    const { init, experiments } = useSelector((state) => state.experiments);

    useEffect(() => {

        if(!init) {

            window.JSLib.push(['init', 'react-serach', (experimentData) => {
                dispatch(update(experimentData));
            }]);
    
            dispatch(registered());
        }
    }, [init]);

    return experiments;
};

export default useExperiments;