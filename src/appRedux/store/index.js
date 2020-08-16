const initialState={
    socket:null,
    userId:""
}

function rootReducer(state=initialState,action){
    switch(action.type){
        case 'SET':
            return {...state,
                userId:action.payload
            }
        case 'UNSET':
            return {...state,
                socket:null
            }
            case 'SET_SOCKET':
               
                return {...state,
                    socket:action.payload
                }
    }
}

export default rootReducer