import { TitleComponent } from 'echarts/components'
import Swal , {SweetAlertIcon} from 'sweetalert2'

// test commit
// test commit 2


// icon
// - success
// - error
// - warning : (!)
// - info  : (!) กลับหัว
// - question : (?)

// position
// - center
// - center-start
// - center-end
// - top
// - top-start
// - top-end
// - bottom
// - bottom-start
// - buttom-end

function convertTime(timer:number){
    return timer*1000
}

export default class MsgAlert {

    confirmeBtn:boolean = true

    // default alert
    succ(msg:string,timer?:number,confirmeBtn?:boolean){
        if(timer) timer = convertTime(timer)
        if(confirmeBtn === false) this.confirmeBtn = confirmeBtn
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: msg ,
            showConfirmButton: !this.confirmeBtn,
            timer: timer,
        })
    }

    err(msg:string,timer?:number,confirmeBtn?:boolean){
        if(timer) timer = convertTime(timer)
        if(confirmeBtn === false) this.confirmeBtn = confirmeBtn
        Swal.fire({
            position: 'center' ,
            icon: 'error' ,
            title: msg ,
            showConfirmButton: this.confirmeBtn ,
            timer: timer ,
        })
    }

    info(msg:string,timer?:number,confirmeBtn?:boolean){
        if(timer) timer = convertTime(timer)
        if(confirmeBtn === false) this.confirmeBtn = confirmeBtn
        Swal.fire({
            position: 'center' ,
            icon: 'info' ,
            title: msg ,
            showConfirmButton: this.confirmeBtn ,
            timer: timer ,
        })
    }

    warning(msg:string,timer?:number,confirmeBtn?:boolean){
        if(timer) timer = convertTime(timer)
        if(confirmeBtn === false) this.confirmeBtn = confirmeBtn
        Swal.fire({
            position: 'center' ,
            icon: 'warning' ,
            title: msg ,
            showConfirmButton: this.confirmeBtn ,
            timer: timer ,
        })
    }

    question(msg:string,timer?:number,confirmeBtn?:boolean){
        if(timer) timer = convertTime(timer)
        if(confirmeBtn === false) this.confirmeBtn = confirmeBtn
        Swal.fire({
            position: 'center' ,
            icon: 'question' ,
            title: msg ,
            showConfirmButton: this.confirmeBtn ,
            timer: timer ,
        })
    }

    // toast alert
    succToast(msg:string,timer?:number,confirmeBtn?:boolean){
        if(timer) timer = convertTime(timer)
        if(confirmeBtn === false) this.confirmeBtn = confirmeBtn

        Swal.mixin({
            toast: true ,
            position: 'bottom-end',
            timer: timer ,
            timerProgressBar: true ,
            showCancelButton: false ,
            showConfirmButton: false ,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }).fire({
            title: msg ,
            icon: 'success'
        })
    }

    errToast(msg:string,timer?:number,confirmeBtn?:boolean){
        if(timer) timer = convertTime(timer)
        if(confirmeBtn === false) this.confirmeBtn = confirmeBtn

        Swal.mixin({
            toast: true,
            position: 'bottom-end',
            timer: timer,
            timerProgressBar: true,
            showCancelButton: false,
            showConfirmButton: false,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }).fire({
            title: msg,
            icon: 'error'
        })
    }

    // other alert
    confirm(msg:string,icon?:SweetAlertIcon){
        return new Promise((resolve , reject)=>{
            Swal.fire({
                title: msg ,
                icon: icon,
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ยืนยัน',
            }).then((afterClick)=>{
                if(afterClick.isConfirmed === true){
                    resolve(true)
                }else{
                    reject()
                }
            })
        })
    }

    lightBox(url:string,width?:string){
        let defaultWidth:string = '600px'
        if(width) defaultWidth = width

        Swal.fire({
            width:defaultWidth,
            imageWidth: '100%',
            imageHeight: '100%',
            imageUrl: url,
            showConfirmButton:false,
            background:'rgba(0, 0, 0, 0)',
            backdrop:'rgba(0, 0, 0, 0.9)',
          })
    }
}

