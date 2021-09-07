import axios from "axios";

const KEY = "1edef28b3928e14390ea7d2bc7fc5bd2";

export default axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5",
    params: {
        appid: KEY
    }
});