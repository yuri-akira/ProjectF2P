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
                    source={require('../img/logofirstscreen.png')}
                    style={styles.logo}
                />
                <CategorySelector onCategoryChangedListener={(category) => setCategory(category)} />
                <TouchableHighlight style={styles.btnSearch}
                    underlayColor="#750f04"
                    onPress={() => navigation.navigate('Results', {
                        genre: category
                    })}>
                    <Text style={{ color: '#ffff', fontSize: 16 }}>Search</Text>
                </TouchableHighlight>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 140,
        height: 156,
        marginBottom: 50,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    bgImg: {
        flex: 1
    },
    container: {
        paddingTop: 100,
        alignItems: 'center',
    },
    btnSearch: {
        width: 90,
        margin: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#b51c0b'
    }
})
