export function isValidEmail(v:string) {
    return v === '' || /[a-zA-Z0-9._%+-]+@rmuti\.ac\.th/.test(v) || 'กรุณากรอก E-mail ให้อยู่ในรูปแบบ username@rmuti.ac.th'
}

export function isRmutiId(v:string){
    return v === '' || /\d{11}-\d$/.test(v) || 'กรุณากรอกรหัสนักศึกษาให้อยู่ในรูป 62332110XXX-X'
}

export function isThaiLang(v:string){
    return v === '' || /^[\u0E00-\u0E7F\u0020]+$/.test(v) || 'กรุณากรอกเป็นภาษาไทยเท่านั้น'
}

export function isRmutiEmail(v:string){
    return v === '' || /^[a-zA-Z0-9_.+-]+@rmuti\.ac\.th$/.test(v) || 'กรุณากรอกอีเมลให้อยู่ในรูปแบบ username@rmuti.ac.th'
}

export function isPasswordStrength(v:string){
    return v === '' || /^^[A-Za-z]{8,}[a-z\d!@#$%^&*()_+-=]*$$/.test(v) || 'กรุณากรอกรหัสผ่านเป็นภาษาอังกฤษและอย่างน้อย 8 ตัวอักษร'
}

export function isUsername(v:string){
    return v === '' || /^[a-zA-Z0-9]{5,}\s*$/.test(v) || 'กรุณากรอกตัวอักษรเป็นภาษาอังกฤษและมีตัวอักษรอย่างน้อย 5 ตัวอักษร'
}
 
export function imageValidate(v:any){
    return !v || !v.length || v[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
}

export function isEmail(v:string){
    return  v === '' || /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'กรุณากรอกอีเมลให้ถูกต้อง'
}

export function isAllNumber(v:any){
    return v === '' || /^\d+$/.test(v) || 'กรุณากรอกเบอร์โทรด้วยตัวเลข'
}

export function required(v:any) {
    return  !!v || 'กรุณากรอกข้อมูล'
}