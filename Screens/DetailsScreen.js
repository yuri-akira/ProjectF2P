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

    function renderStatus() {
        if (data.status === 'Live') {
            return (<Text style={[styles.gameStatus, {color: '#19fc00'}]}>{data.status}</Text>)
        } else {
            return (<Text style={[styles.gameStatus, {color: '#ff0008'}]}>{data.status}</Text>)
        }
    }

    function renderData() {
        return (
            <ScrollView style={styles.scrollView} >
                <Text style={styles.fontTitle}>{data.title}</Text>
                {renderStatus()}
                <Image
                    source={{ uri: data.thumbnail }}
                    style={styles.coverImg}
                />
                <View style={styles.container}>
                    <Text style={styles.fontDescription}>{data.description}</Text>
                    <View style={styles.techDataContainer}>
                        <Text style={styles.fontSmallerTitle}>Technical information</Text>
                        <Text style={styles.fontData}>{`Genre: ${data.genre}`}</Text>
                        <Text style={styles.fontData}>{`Platform: ${data.platform}`}</Text>
                        <Text style={styles.fontData}>{`Publisher: ${data.publisher}`}</Text>
                        <Text style={styles.fontData}>{`Developer: ${data.developer}`}</Text>
                        <Text style={styles.fontData}>{`Release Date: ${data.release_date}`}</Text>
                    </View>
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
    fontSmallerTitle: {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ffff',
        marginBottom: 3
    },
    fontData: {
        color: '#ffff',
        fontSize: 15,
        padding: 7,
        textAlign: 'left'
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
        paddingHorizontal: 15
    },
    techDataContainer: {
        marginTop: 5,
        padding: 10,
        backgroundColor: 'rgba(132, 207, 232, 0.1)'
    },
    gameUrl: {
        margin: 5,
        fontSize: 16,
        color: '#b0cfff',
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    gameStatus: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13
    }
})
