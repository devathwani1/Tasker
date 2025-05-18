export type dateObj = {
    'date' : number,
    'week_num' : number,
    'week_day' : string
}

type dateType = (year:number,month:number) => dateObj[]


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
        const day = new Date(year,month,i).getDay()
        dates.push({
            'date' : i,
            'week_num' : day,
            'week_day' : weeks[day]
        })
    }

    return dates
    
}