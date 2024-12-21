import { View, Text, Platform, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { AppColors } from '@/assets/Colors'
import React, { useState } from 'react'
import SessionRestorer from '@/features/active_session/session_restorer'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { OtherConditionType } from '@/features/auth/userData';
import { ActiveSession } from '@/features/active_session/session_storage';
import { formatDate } from '@/features/date_time/DateTimeUtils';
import AppDatePicker from '@/features/date_time/AppDatePicker';


type OtherConditionTypeUiModel = {
    name: string;
    type: OtherConditionType
}

//TODO: mock data, get it from config
const otherConditionTypesUiModel: OtherConditionTypeUiModel[] = [
    {
        name: "diabetes",
        type: OtherConditionType.diabetes
    },
    {
        name: "heart_disease",
        type: OtherConditionType.heart_disease
    },
    {
        name: "hypertension",
        type: OtherConditionType.hypertension
    },
    {
        name: "glaucoma",
        type: OtherConditionType.glaucoma
    },
    {
        name: "other",
        type: OtherConditionType.other
    },
]

export function ThirdStepView() {
    const [date, setDate] = useState(new Date());
    const [dateSelected, setDateSelected] = useState(false);
    const sessionRestorer = new SessionRestorer()
    const appDatePicker = new AppDatePicker()
    appDatePicker.onDateChanged = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const newDate = selectedDate || new Date()
        ActiveSession.userData.lastDiagnosisDate = newDate
        setDate(newDate);
        setDateSelected(true)
    }

    const isUserAlreadyHaveThisConditionType = (type: OtherConditionType) => {
        return ActiveSession.userData.otherConditionTypes.indexOf(type) != -1
    }

    function onItemCheckedChanged(conditionType: OtherConditionType) {
        const isAlreadyHave = isUserAlreadyHaveThisConditionType(conditionType)
        if (!isAlreadyHave) {
            // add
            ActiveSession.userData.otherConditionTypes = [...ActiveSession.userData.otherConditionTypes, conditionType]
        } else {
            ActiveSession.userData.otherConditionTypes = ActiveSession.userData.otherConditionTypes.filter(type => (type != conditionType))
        }
    }

    return (
        <View style={styles.allWrap}>
            <Text style={[styles.mainText, styles.headerText]}>When where u diagnosed?</Text>
            <TouchableOpacity
                style={styles.dateInput}
                onPress={() => { appDatePicker.showDatePicker() }}
            >
                <Text>{dateSelected && formatDate(date)}</Text>
            </TouchableOpacity>
            <Text style={[styles.mainText, styles.headerText]}>Do ypu sugger from other conditions?</Text>

            <View style={styles.cards_container}>
                {
                    otherConditionTypesUiModel.map(item => (
                        <ConditionCardView
                            name={item.name}
                            checked={isUserAlreadyHaveThisConditionType(item.type)}
                            conditionType={item.type}
                            onChackedChanged={onItemCheckedChanged}
                            key={item.type}
                        />
                    ))
                }
            </View>
            <TouchableOpacity
                style={{ marginEnd: 30 }}
                onPress={() => { sessionRestorer.saveIsOnboardingPassed() }}
            >
                <Text style={styles.mainText}>end of onboarding</Text>
            </TouchableOpacity>
        </View>
    );
}

type OtherConditionCardProps = {
    name: string;
    checked: boolean;
    conditionType: OtherConditionType;
    onChackedChanged: (cancerType: OtherConditionType) => void
};

function ConditionCardView({ name, checked, conditionType, onChackedChanged }: OtherConditionCardProps) {
    const [isChecked, setIsCheked] = useState(checked);
    const cardBackgroundColor = isChecked ? '#336' : AppColors.white
    const checkmarkIcon = isChecked ? (
        <Ionicons name='checkmark-circle' size={15} color={'#FFF'} style={{ position: 'absolute', left: 5, top: 10 }} />
    ) : null

    return (
        <TouchableOpacity
            onPress={() => {
                onChackedChanged(conditionType)
                setIsCheked(!isChecked)
            }}
            style={[styles.cardItem, { backgroundColor: cardBackgroundColor }]}
        >
            {checkmarkIcon}
            <Text style={styles.cardText}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    allWrap: {
        paddingHorizontal: 16,
        flex: 1
    },
    mainText: {
        color: AppColors.white,
        fontSize: 14,
        fontFamily: 'SpaceMono',
        fontWeight: '600',
        textAlign: 'center'
    },
    headerText: {
        fontSize: 25,
        fontWeight: '400'
    },
    dateInput: {
        backgroundColor: AppColors.white,
        width: 'auto',
        marginHorizontal: 24,
        borderRadius: 16,
        padding: 16
    },
    cards_container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    },
    cardItem: {
        backgroundColor: AppColors.white,
        marginHorizontal: 2,
        marginVertical: 7,
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 8,
        position: 'relative'
    },
    cardText: {
        fontSize: 14,
        fontFamily: 'SpaceMono',
        fontWeight: '400',
        textAlign: 'center',
        color: AppColors.appPinkDarker
    }
})
