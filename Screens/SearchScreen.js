import React, { useState } from 'react';
import CategorySelector from '../Components/CategorySelector';

import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableHighlight
} from 'react-native';

export default function SearchScreen({ navigation }) {
    
    const [category, setCategory] = useState();

    return (
        <ImageBackground source={require('../img/imgbground.png')} style={styles.bgImg}>
            <View style={styles.container}>
                <Image
                    source={require('../img/freetogame-logo.png')}
                    style={styles.logo}
                />
                <CategorySelector funcGetCategory = { (category) => setCategory(category)  } />
                <TouchableHighlight style={styles.btnSearch}
                    underlayColor="#750f04"
                    onPress={() => navigation.navigate('Results', {
                        genre : category
                    })}>
                    <Text style={{ color: '#ffff' }}>Search</Text>
                </TouchableHighlight>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    bgImg: {
        flex: 1
    },
    container: {
        alignItems: 'center',
    },
    btnSearch: {
        width: 90,
        margin: 20,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#b51c0b'
    }
})
