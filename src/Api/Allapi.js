import CommonApi from "./Commonapi";

export const honda=(header)=>{
    return CommonApi(header,"get","yolores/","")
}
export const TokenGenerate=(data)=>{
    return CommonApi("","POST","token/",data)
}