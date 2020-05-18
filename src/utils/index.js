//包含n个工具函数
//根据条件返回路径
export function getRedirectTo(type, header) {
    let path
    if (type === 'laoban')
        path = '/laoban'
    else
        path = '/dashen'

    if (!header)
        path += 'info'
    return path
}

//检查数组或对象中是否有空字符串,并根据keyName返回位置
export function formatErrMsg(obj,keyName){
    let msg=[]
    Object.keys(obj).map((key, index) => {
        if (!obj[key]){
            msg.push(keyName[index])
        }
    })
    return msg
}
