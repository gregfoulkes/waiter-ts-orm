import { Day } from "../entity/Day";

export default class DayService {

    //Add a list of weekdays. 
    //Only for testing purposes.

    async addWeekdays() {
        try {
            let dayList: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            for (let i = 0; i < dayList.length; i++) {
                const day = new Day();
                day.dayname = dayList[i];
                await day.save();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    //Get all the days of the week
    //Result is to render checkboxes on page to select shift days

    async getWeekdays() {
        const day = new Day();
        const days = await Day.find({});
        return days;
    }

    //clear the days of the week in the database. 
    // Also only for testing purposes.

    async clearDays() {
        const day = new Day();
        const allDays = await Day.find({});
        Day.remove(allDays);
    }
}