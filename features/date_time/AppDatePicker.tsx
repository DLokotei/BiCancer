import { View, Text, Platform } from 'react-native'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';

class AppDatePicker {

    currentDate: Date = new Date();

    onDateChanged: (event: DateTimePickerEvent, date?: Date) => void = (e, date) => {}

    showDatePicker = () => {
        if (Platform.OS == 'web') {
            alert('date piker is for mobile all only, currend date is similated!')
            this.onDateChanged({nativeEvent: {timestamp: 2, utcOffset: 0}, type: 'set' }, new Date());
            return
        }
        DateTimePickerAndroid.open({
            value: this.currentDate,
            onChange: this.onDateChanged,
            mode: 'date',
            is24Hour: true,
        });
    };
}

export default AppDatePicker