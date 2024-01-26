 
const dayjs =  require('dayjs')
require('dayjs/locale/th')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)


module.exports = async (date , fromNow , short )=> {
    let date_convert = (short===true)? dayjs(date).locale('th').format('DD/MM/YYYY') : dayjs(date).locale('th').format('DD MMMM YYYY HH:mm') + ' น.'
    if(fromNow === true){
        date_convert = date_convert + ` (${dayjs(date).locale('th').fromNow(true)} ก่อน)` 
    }
    return date_convert;
}
