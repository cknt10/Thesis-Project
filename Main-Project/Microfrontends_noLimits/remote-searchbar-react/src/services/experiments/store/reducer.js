import produce from 'immer';

const experimentsReducer = produce((state = {
    init: false,
    experiments: []
}, action) => {
    switch(action.type) {
        case "@experiments/REGISTERED":
            state.init = true;
            return;
        case "@experiments/UPDATE":
            state.experiments.push(action.payload);
            return;
        default:
            return state;
    }
});

export default experimentsReducer;