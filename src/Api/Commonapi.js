import axios from "axios";
export const hostip = `${window.location.protocol}//${window.location.hostname}:8080`;

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