import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Text,
    View,
    Image,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Alert
} from 'react-native';

export default ResultScreen = ({ route, navigation }) => {
    const { gameId } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`https://www.freetogame.com/api/game?id=${gameId}`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch(() =>
                Alert.alert(
                    'Error',
                    'Sorry, something went wrong. Please try again later',
                    [
                        { text: "OK", onPress: () => navigation.goBack() }
                    ],
                    { cancelable: false }
                ))
            .finally(() => setLoading(false));
    }, []);

    function renderContent() {
        if (isLoading) {
            return renderLoading();
        } else {
            return renderData();
        }
    }

    function renderLoading() {
        return (<ActivityIndicator size="large" color="#0000ff" />)
    }

    function renderData() {
        return (
            <ScrollView style={styles.scrollView} >
                <View style={styles.container}>
                    <Text>{data.title}</Text>
                    <Image
                        source={{ uri: data.thumbnail }}
                        style={styles.coverImg}
                    />
                    <Text>{data.thumbnail}</Text>
                </View>
            </ScrollView>
        )
    }

    return (
        <ImageBackground source={require('../img/imgbground.png')} style={styles.bgImg} imageStyle={{ opacity: 0.9 }}>
            { renderContent()}
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    bgImg: {
        flex: 1
    },
    scrollView: {
        margin: 10,
    },
    coverImg: {
        height: 300,
        width: 400,
        resizeMode: 'contain'
    },
    container:{
        justifyContent: 'center'
    }
})
