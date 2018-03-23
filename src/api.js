import fetch from "isomorphic-fetch"

const baseUrl = "u2k3esuwgd.execute-api.us-east-1.amazonaws.com/prod"

export default {
    getDailyContent(number) {
        return fetch(`${ baseUrl }/getDailyContent/${ number }`)
            .then(res => res.json())
    },
    getDays() {
        return fetch(`${ baseUrl }/days`)
            .then(res => res.json())
    }
}