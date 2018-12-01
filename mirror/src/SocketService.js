const socket = require('socket.io-client')('http://localhost:8081');

socket.on("error", (error) => {
    console.log(error)
})

export default {
    init(store) {
        socket.on("action", (action) =>
            store.dispatch(action)
        )

        socket.on("connect", () => {
            store.dispatch({ type: "UPDATE_FACIAL_RECOGNITION_STATUS", payload: { isConnected: true } })
            console.log("Connected !")
        })

        socket.on("connect_error", () => {
            if (store.getState().FacialRecognition.isConnected)
                store.dispatch({ type: "UPDATE_FACIAL_RECOGNITION_STATUS", payload: { isConnected: false } })
            console.log("Can't connect !")
        })
    },
    emit(type, payload) {
        socket.emit(type, payload)
    }
}