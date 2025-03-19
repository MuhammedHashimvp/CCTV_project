import axios from "axios";
export const hostip = "http://192.168.135.241:8000"

const CommonApi = (reqHeader, reqMethod, reqUrl, reqBody) => {
    const config = {
        method: reqMethod,
        url: hostip+"/"+reqUrl,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
    };
    return axios(config);
};

export default CommonApi;