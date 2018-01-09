import fetch from "isomorphic-fetch";

export default {
    getDayContent(number) {
        return fetch(`/day/${ number }`)
            .then(res => res.text());
    },
    getCountdowns() {
        return fetch("day/countdownTimes")
            .then(res => res.json());
    }
}