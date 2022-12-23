export function isValidEmail(v:string) {
    return v === '' || /[a-zA-Z0-9._%+-]+@rmuti\.ac\.th/.test(v) || 'กรุณากรอก E-mail ให้อยู่ในรูปแบบ username@rmuti.ac.th'
}

export function isRmutiId(v:string){
    console.log(v === '' || /\d{11}-\d$/.test(v) || 'กรุณากรอกรหัสนักศึกษาให้อยู่ในรูป 62332110XXX-X');

    return v === '' || /\d{11}-\d$/.test(v) || 'กรุณากรอกรหัสนักศึกษาให้อยู่ในรูป 62332110XXX-X'
}

export function isThaiLang(v:string){
    return v === '' || /^[\u0E00-\u0E7F\u0020]+$/.test(v) || 'กรุณากรอกเป็นภาษาไทยเท่านั้น'
}

export function isRmutiEmail(v:string){
    return v === '' || /^[a-zA-Z0-9_.+-]+@rmuti\.ac\.th$/.test(v) || 'กรุณากรอกอีเมลให้อยู่ในรูปแบบ username@rmuti.ac.th'
}

export function isPasswordMatch(newPassword:string,repeatPassword:string){
        return repeatPassword === '' || repeatPassword === newPassword || 'กรุณากรอกรหัสผ่านให้ตรงกัน'
}
