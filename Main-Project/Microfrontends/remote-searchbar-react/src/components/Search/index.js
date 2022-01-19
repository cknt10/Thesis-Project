
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search } from './store/actions';
// import { MoviePayload } from './store/types';
import Row from '../../utils/grid/Row';
import Col from '../../utils/grid/Col';
import Alert from '../../utils/messages/Alert';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';

import useExperiments from '../../services/experiments/useExperiments';

// const Search: React.FC = () => {
const Search = () => {

    const dispatch = useDispatch();
    // const {results, error} = useSelector((state: any) => state.search);
    const {results, error} = useSelector((state) => state.search);
    // const [open, setOpen] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    // const [options, setOptions] = useState<readonly MoviePayload[]>([]);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    const experiments = useExperiments();

    const [bubble, setBubble]  = useState(<></>);

    useEffect(() => {

        if (!loading) {
            return undefined;
        }

        dispatch(search());
    }, [loading]);

    useEffect(() => {

        setOptions(results);
    }, [results]);

    useEffect(() => {
        if(experiments[0] && experiments[0].detail)console.log("ask", experiments[0].detail);
        
        if(experiments[0] && experiments[0].detail && experiments[0].detail.data && experiments[0].detail.data.search){//JS darauf vorbereiten array.map ist experiment mit id vorhanden  ... passende experimenten id, dann variante
            setBubble(
            <div className="bubble">
                <div><i className="arrow"></i></div>
                <div className="suggestions">Wir haben neue Vorschläge für dich!</div>
            </div>
            );
        }
        
    }, [experiments]);

    return (
        <div>

            <Row>
                <Col xs={12}>
                    <div className="autocomplete">
                        <Autocomplete
                        
                            
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    // Prevent's default 'Enter' behavior.
                                    event.isDefaultPrevented = true;
                                    // your handler code

                                    for(let i=0; i<= options.length; i++){
                                        if(options[i].title === event.target.defaultValue){//location.protocol
                                            window.location.href = `http://localhost:8080/pdp/${options[i].id}`
                                        }
                                    }
                                }
                            }}
                            
                            id="asynchronous-demo"
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            isOptionEqualToValue={(option, value) => option.title === value.title}
                            getOptionLabel={(option) => option.title}
                            options={options}
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Asynchronous"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        )
                                    }}
                                />
                            )}
                        />
                    </div>
                    <Alert type="error" message={error} />
                </Col>
            </Row>
            {bubble}
        </div>
    );
};

export default Search;