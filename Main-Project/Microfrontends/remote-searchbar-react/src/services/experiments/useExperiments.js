import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registered, update } from './store/actions';

const useExperiments = () => {

    const dispatch = useDispatch();
    const { init, experiments } = useSelector((state) => state.experiments);

    useEffect(() => {

        if(!init) {

            try{

                window.JSLib?.push(['add', 'react-search', 'CK: A/B Test Bubble', (experimentData) => {
                    dispatch(update(experimentData));
                }]);
        
                dispatch(registered());
            } catch (e){
                console.error("searchbar was not able to react on variation", e);
            }
        }
    }, [init]);

    return experiments;
};

export default useExperiments;