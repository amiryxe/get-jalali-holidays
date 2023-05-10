import fs from 'fs'
import _ from 'lodash'
import ice from './ice/index.js'
import jalaali from 'jalaali-js'
import moment from 'moment'

(async () => {
    const yearEvents = await ice.default({ year: 1402 }) // all events of the year

    const newArray = []
    _.flattenDeep(yearEvents).forEach(item => {
        if (item.isHoliday) {
            newArray.push({
                ...item,
                date: moment(jalaali.jalaaliToDateObject(item.year, item.month, item.day)).format('YYYY-MM-DD')
            })
        }
    })

    fs.writeFile('yearEvents.json', JSON.stringify(newArray), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data has been saved to yearEvents.json');
    });
})();

