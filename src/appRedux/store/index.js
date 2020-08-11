const initialState={
    userId:localStorage.getItem('user'),
    socket:""
}

function rootReducer(state=initialState,action){
    switch(action.type){
        case 'SET':
            return {...state,
                userId:action.payload
            }
        case 'UNSET':
            return {...state,
                socket:""
            }
            case 'SET_SOCKET':
                return {...state,
                    socket:action.payload
                }
    }
}

export default rootReducer