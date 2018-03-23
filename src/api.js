import fetch from "isomorphic-fetch"

const baseUrl = "https://u2k3esuwgd.execute-api.us-east-1.amazonaws.com/prod"

const API = {
    getDailyContent(number) {
        return fetch(`${ baseUrl }/getDailyContent/${ number }`)
            .then(res => res.json())
    },
    getDays() {
        return fetch(`${ baseUrl }/days`)
            .then(res => res.json())
    }
}

export default API