import CommonApi from "./Commonapi";

export const honda=(header)=>{
    return CommonApi(header,"get","yolores/","")
}
export const graphget=(header)=>{
    return CommonApi(header,"get","graph/","")
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

export const behavioursget=(header)=>{
    return CommonApi(header,"get","behaviours/","")
}

export const behaviourspost=(header,data)=>{
    return CommonApi(header,"post","behaviours/",data)
}

export const behavioursdel=(header,id)=>{
    return CommonApi(header,"delete",`behaviours/${id}/`,"")
}

export const stdsget=(header)=>{
    return CommonApi(header,"get","students/","")
}
export const stdspost=(header,data)=>{
    return CommonApi(header,"post","students/",data)
}
export const stdsput=(header,id,data)=>{
    return CommonApi(header,"put",`students/${id}/`,data)
}
export const stdsdel=(header,id,data)=>{
    return CommonApi(header,"delete",`students/${id}/`,"")
}
