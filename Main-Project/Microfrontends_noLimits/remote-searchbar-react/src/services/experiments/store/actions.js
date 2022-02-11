export function registered() {
    return {
        type: "@experiments/REGISTERED"
    }
}

export function update(experimentData) {
    return {
        type: "@experiments/UPDATE",
        payload: experimentData
    }
}