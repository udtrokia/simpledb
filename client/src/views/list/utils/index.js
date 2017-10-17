


export const intersection=(raw,region)=>{
    let checkSame=(value)=>{
	if(region===value)
	    return value
    }
   return raw.filter(checkSame)
}

export const checkDate=(date)=>{
    let regex = /^\d{4}\/\d{1,2}\/\d{1,2}$/g
    if(regex.test(date)){
	return true
    }else{
	return false
    }
}

export const checkNumber=(number)=>{
    let regex= /\d+/g
    if(regex.test(number)){
	return true
    }else{
	return false
    }
}

export const checkTel=(number)=>{
    let regex= /^\d{11}$/g
    if(regex.test(number)){
	return true
    }else{
	return false
    }    
}

export const checkAge=(age)=>{
    let regex= /^\d+$/
    if(regex.test(age)){
	return true
    }else{
	return false
    }
}

export const checkChinese=(str)=>{
    let regex = /^[\u4e00-\u9fa5]+$/g
    if(regex.test(str)){
	return true
    }else{
	return false
    }    
}
