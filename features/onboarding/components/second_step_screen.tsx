import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppColors } from '@/assets/Colors'
import React, { useState } from 'react'
import { CancerType } from '@/features/auth/userData';
import { ActiveSession } from '@/features/active_session/session_storage';

type CancerTypeUiModel = {
    imageSrc: string;
    name: string;
    type: CancerType
}

//TODO: mock data, get it from config
const cancerTypesUiModel: CancerTypeUiModel[] = [
    {
        imageSrc: '',
        name: 'Breast Cancer',
        type: CancerType.breast
    },
    {
        imageSrc: '',
        name: 'Lung Cancer',
        type: CancerType.lung
    },
    {
        imageSrc: '',
        name: 'Colon Cancer',
        type: CancerType.colon
    },
    {
        imageSrc: '',
        name: 'Endometrial Cancer',
        type: CancerType.endometrial
    },
    {
        imageSrc: '',
        name: 'Cervial Cancer',
        type: CancerType.cervial
    },
    {
        imageSrc: '',
        name: 'Ovarian Cancer',
        type: CancerType.ovarian
    },
    {
        imageSrc: '',
        name: 'Other',
        type: CancerType.other
    }
]

export const SecondStepView = () => {

    const isUserAlreadyHaveThisCancerType = (type: CancerType) => {
        return ActiveSession.userData.selectedCancerTypes.indexOf(type) != -1
    }

    function onItemCheckedChanged(cancerType: CancerType) {
        const isAlreadyHave = ActiveSession.userData.selectedCancerTypes.indexOf(cancerType) != -1
        if (!isAlreadyHave) {
            // add
            ActiveSession.userData.selectedCancerTypes = [...ActiveSession.userData.selectedCancerTypes, cancerType]
        } else {
            ActiveSession.userData.selectedCancerTypes = ActiveSession.userData.selectedCancerTypes.filter(type => (type != cancerType))
        }
    }

    return (
        <View style={styles.allWrap}>
            <Text style={[styles.mainText, styles.headerText]}>Coose your cancer</Text>
            <FlatList
                contentContainerStyle={{ justifyContent: "space-evenly" }}
                data={cancerTypesUiModel}
                numColumns={2}
                renderItem={listItem =>
                    <CancerCardView
                        imgSource=''
                        name={listItem.item.name}
                        checked={isUserAlreadyHaveThisCancerType(listItem.item.type)}
                        cancerType={listItem.item.type}
                        onChackedChanged={onItemCheckedChanged}
                    />
                }
                keyExtractor={item => item.type}
            />
        </View>
    )
}

type CancerCardProps = {
    imgSource: string;
    name: string;
    checked: boolean;
    cancerType: CancerType;
    onChackedChanged: (cancerType: CancerType) => void
};

function CancerCardView({ imgSource, name, checked, cancerType, onChackedChanged }: CancerCardProps) {
    const [isCheked, setIsCheked] = useState(checked);
    const cardBackgroundColor = isCheked ? '#336' : AppColors.white
    const checkmarkIcon = isCheked ? (
        <Ionicons name='checkmark-circle' size={15} color={'#FFF'} style={{ position: 'absolute', left: 15, top: 15 }} />
    ) : null

    return (
        <TouchableOpacity
            onPress={() => {
                onChackedChanged(cancerType)
                setIsCheked(!isCheked)
            }}
            style={[styles.cardItem, { backgroundColor: cardBackgroundColor }]}
        >
            {checkmarkIcon}
            <Image
                source={require('@/assets/images/react-logo.png')}
                style={{ height: 120 }}
            />
            <Text style={styles.cardText}>{name}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    allWrap: {
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: 'space-between'
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
    cardItem: {
        height: 'auto',
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 12,
        backgroundColor: AppColors.white,
        borderRadius: 16,
        alignItems: 'center'
    },
    cardText: {
        color: AppColors.black,
        fontSize: 14,
        fontFamily: 'SpaceMono',
        fontWeight: '600',
        textAlign: 'center'
    }
})
