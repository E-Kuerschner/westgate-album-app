import fetch from "isomorphic-fetch";

export default {
    getDayContent(number) {
        return fetch(`/day/${ number }`)
            .then(res => res.text());
    }
}