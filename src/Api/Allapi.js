import CommonApi from "./Commonapi";

export const honda=(header)=>{
    return CommonApi(header,"get","yolores/","")
}

export const cameras=(header)=>{
    return CommonApi(header,"get","camera/","")
}
export const camerasadd=(header,data)=>{
    return CommonApi(header,"post","camera/",data)
}
export const camerasdel=(header,id)=>{
    return CommonApi(header,"delete",`camera/${id}/`,"")
}

export const TokenGenerate=(data)=>{
    return CommonApi("","POST","token/",data)
}