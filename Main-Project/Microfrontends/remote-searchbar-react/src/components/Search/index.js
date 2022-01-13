
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

    useEffect(() => {

        if (!loading) {
            return undefined;
        }

        dispatch(search());
    }, [loading]);

    useEffect(() => {

        setOptions(results);
    }, [results]);

    return (
        <Row>
            <Col xs={12}>
                <div className="autocomplete">
                    <Autocomplete
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
    );
};

export default Search;