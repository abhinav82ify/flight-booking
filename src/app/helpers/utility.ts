export function convertDateStringToDate(dateString: string): Date {
    const dateArray = dateString.split("/");
    const day = `${dateArray[2]}`.padStart(2, "0");
    const month = `${dateArray[1]}`.padStart(2, "0");
    const year = `${dateArray[0]}`;

    let date: Date = new Date(`${year}-${month}-${day}`);
    return date;
}

export function dateAndTimeToDateObject(dateString: string, timeString: string): Date {
    let date = convertDateStringToDate(dateString);

    const timeArray = timeString.split(":");
    const hours = parseInt(timeArray[0]);
    const minutes = parseInt(timeArray[1]);
    
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    
    return date;
}

export function differenceInMinutes(date1: Date, date2: Date): number {
    let diff = (date1.getTime() - date2.getTime())/1000;
    diff /= 60;
    return Math.floor(diff);
}

export function calculateDuration(time1, time2) {
    const diff = differenceInMinutes(time1, time2);
    const hours = `${Math.floor(diff/60)}`.padStart(2);
    const minutes = `${diff%60}`.padStart(2);

    return `${hours}h ${minutes}m`;
  }