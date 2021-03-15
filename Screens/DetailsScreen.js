import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Text,
    View,
    Image,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Linking,
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
                <Text style={styles.fontTitle}>{data.title}</Text>
                {data.status === 'Live' ? 
                    <Text style={styles.gameStatusGreen}>{data.status}</Text> :
                    <Text style={styles.gameStatusRed}>{data.status}</Text>
                }
                <Image
                    source={{ uri: data.thumbnail }}
                    style={styles.coverImg}
                />
                <View style={styles.container}>
                    <Text style={styles.fontDescription}>{data.description}</Text>
                    <Text>{`Genre: ${data.genre}`}</Text>
                    <Text>{`Platform: ${data.platform}`}</Text>
                    <Text>{`Publisher: ${data.publisher}`}</Text>
                    <Text>{`Developer: ${data.developer}`}</Text>
                    <Text>{`Releas Date: ${data.release_date}`}</Text>
                    <Text style={styles.gameUrl}
                        onPress={() => Linking.openURL(data.game_url)}>
                        {`Get ${data.title} here!`}
                    </Text>
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
        margin: 15,
    },
    fontTitle: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ffff'
    },
    fontDescription: {
        color: '#ffff',
        fontSize: 17,
        textAlign: 'justify'
    },
    coverImg: {
        height: 300,
        width: 400,
        resizeMode: 'contain'
    },
    container: {
        justifyContent: 'center',
        backgroundColor: 'rgba(44, 62, 80, 0.9)',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    gameUrl: {
        fontSize: 16,
        color: '#b0cfff',
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    gameStatusGreen: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
        color: '#19fc00'
    },
    gameStatusRed: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
        color: '#ff0008'
    },
})
