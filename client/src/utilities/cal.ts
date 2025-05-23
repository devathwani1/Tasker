import {type DateType} from '../providers/Types'



type taskData = {
    'userId' : number,
    'title' : string,
    'content' : string,
    'pendingOn' : string,
    'createdAt' : string,
    'weekDays' : [],
    'state' : string
}

export type dateWithDataObj = DateType & {
    tasks : taskData[]
}

type dateType = (year:number,month:number) => DateType[]


export const daysInMonths : dateType = (year : number,month : number) => {
    const date = new Date(year,month+1,0);
    const dayCount = date.getDate()
    const weeks : Record<number,string> = {
        0 : "Sunday",
        1 : "Monday",
        2 : "Tuesday",
        3 : "Wednesday",
        4 : "Thursday",
        5 : "Friday",
        6 : "Saturday"
    }

    const dates = []

    for(var i = 1;i <= dayCount;i++){
        const day = new Date(year,month,i)
        dates.push({
            'date' : day.getDate(),
            'full_date' : day.toLocaleDateString('en-CA'),
            'week_num' : day.getDay(),
            'week_day' : weeks[day.getDay()]
        })
    }

    return dates
    
}