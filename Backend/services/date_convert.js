 
const dayjs =  require('dayjs')
require('dayjs/locale/th')

module.exports = async (date)=> {
    let date_convert = dayjs(date).locale('th').format('DD MMMM YYYY HH:mm:ss')
    return date_convert;
}
