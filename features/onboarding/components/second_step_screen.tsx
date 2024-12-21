import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { AppColors } from '@/assets/Colors'
import React, { useState } from 'react'

type CancerType = {
    imageSrc: string;
    name: string;
}

//TODO: mock data, get it from config
const cancerTypes: CancerType[] = [
    {
        imageSrc: '',
        name: 'Breast Cancer'
    },
    {
        imageSrc: '',
        name: 'Lung Cancer'
    },
    {
        imageSrc: '',
        name: 'Colon Cancer'
    },
    {
        imageSrc: '',
        name: 'Endometrial Cancer'
    },
    {
        imageSrc: '',
        name: 'Cervial Cancer'
    },
    {
        imageSrc: '',
        name: 'Ovarian Cancer'
    },
    {
        imageSrc: '',
        name: 'Other'
    }
]

class CardItemClass {
    cancerType: CancerType = { imageSrc: '', name: '' };
    isChecked: boolean = false;
}

export const SecondStepView = () => {

    // const [dataSet, setDataset] = useState<CardItemClass[]>([])

    const dataSet: CardItemClass[] = []
    // fill dataset
    cancerTypes.forEach((item) => {
        const newEntry = new CardItemClass()
        newEntry.cancerType = item
        newEntry.isChecked = false
        dataSet.push(newEntry)
    })
    // setDataset(_dataSet)

    const checkedByUserCancerTypes: CancerType[] = []

    const onItemChecked = (cancerType: CardItemClass) => {
        cancerType.isChecked = !cancerType.isChecked
        // checkedByUserCancerTypes.push(cancerType)
    }

    function renderCancerCard(item: CardItemClass, onPress: (cancerType: CardItemClass) => void) {
        
        return (
            <TouchableOpacity
                onPress={() => {
                    onPress(item)
                }}
                style={styles.cardItem}
            >
                <Image
                    source={require('@/assets/images/react-logo.png')}
                    style={{ height: 120 }}
                />
                <Text style={styles.cardText}>{item.cancerType.name} - {item.isChecked ? 'yeas' : 'not'}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.allWrap}>
            <Text style={[styles.mainText, styles.headerText]}>Coose your cancer</Text>
            <FlatList
                contentContainerStyle={{ justifyContent: "space-evenly" }}
                data={dataSet}
                numColumns={2}
                renderItem={listItem => renderCancerCard(
                    listItem.item,
                    onItemChecked//,
                    //() => checkedByUserCancerTypes.indexOf(listItem.item) != -1
                )}
                keyExtractor={item => item.cancerType.name}
            />
        </View>
    )
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
