import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CategorySelector( props ) {

    const [selectedCategory, setSelectedCategory] = useState('mmorpg');

    useEffect(() =>{
        if (props.funcGetCategory) 
            props.funcGetCategory(selectedCategory)
    }, [selectedCategory]);

    return (
        <View style={styles.pickerContainer}>
            <Picker
                dropdownIconColor="#000000"
                itemStyle={{ fontWeight: 'bold' }}
                style={{ minWidth: 350}}
                selectedValue={selectedCategory}
                onValueChange={itemValue =>
                    setSelectedCategory(itemValue)
                }>
                <Picker.Item label='MMORPG' value='mmorpg' />
                <Picker.Item label='Shooter' value='shooter' />
                <Picker.Item label='Strategy' value='strategy' />
                <Picker.Item label='Sports' value='sports' />
                <Picker.Item label='Survival' value='survival' />
            </Picker>
        </View>
    )   
}

const styles = StyleSheet.create({
    pickerContainer: {
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: '#fff'
    }
})
