const defaultSettings = {
    backgroundColor: 'purple'
}

const defaultState ={
    settings: defaultSettings
}

const reducer = (state, action) => {
    console.log(`Reducer triggered for action: ${JSON.stringify(action)}`)
    return {}
}

export {defaultState, reducer}