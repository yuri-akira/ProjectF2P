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
    Alert,
} from 'react-native';

export default ResultScreen = ({ route, navigation }) => {
    const { gameId } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [screenshots, setScreenshots] = useState();

    useEffect(() => {
        fetch(`https://www.freetogame.com/api/game?id=${gameId}`)
            .then((response) => response.json())
            .then((json) => {
                setData(json)
                setScreenshots(json.screenshots)
            })
            .catch(() =>
                Alert.alert(
                    'Error',
                    'Sorry, something went wrong. Please try again later',
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate('Search Screen')
                        }
                    ],
                    { cancelable: false }
                ))
            .finally(() => setLoading(false));
    }, []);

    function renderScreenshots() {
        if (screenshots.length >= 3) {
            return (
                <View style={styles.techDataContainer}>
                    <Text style={styles.fontSmallerTitle}>Screenshots</Text>
                    <Image
                        source={{ uri: screenshots[0].image }}
                        style={styles.screenshotImg}
                    />
                    <Image
                        source={{ uri: screenshots[1].image }}
                        style={styles.screenshotImg}
                    />
                    <Image
                        source={{ uri: screenshots[2].image }}
                        style={styles.screenshotImg}
                    />
                </View>
            )
        } else if (screenshots.length == 2) {
            return (
                <View style={styles.techDataContainer}>
                    <Text style={styles.fontSmallerTitle}>Screenshots</Text>
                    <Image
                        source={{ uri: screenshots[0].image }}
                        style={styles.screenshotImg}
                    />
                    <Image
                        source={{ uri: screenshots[1].image }}
                        style={styles.screenshotImg}
                    />
                </View>
            )
        }
        else if (screenshots.length == 1) {
            return (
                <View style={styles.techDataContainer}>
                    <Text style={styles.fontSmallerTitle}>Screenshots</Text>
                    <Image
                        source={{ uri: screenshots[0].image }}
                        style={styles.screenshotImg}
                    />
                </View>
            )
        }
    }

    function renderContent() {
        if (isLoading) {
            return renderLoading();
        } else {
            return renderData();
        }
    }

    function renderFooterContent() {
        if (isLoading) {
            return renderLoading();
        } else {
            return renderScreenshots();
        }
    }

    function renderLoading() {
        return (<ActivityIndicator size="large" color="#FFFF" />)
    }

    function renderStatus() {
        if (data.status === 'Live') {
            return (<Text style={[styles.gameStatus, { color: '#32bf49' }]}>{data.status}</Text>)
        } else {
            return (<Text style={[styles.gameStatus, { color: '#b52438' }]}>{data.status}</Text>)
        }
    }

    function renderMinRequirements() {
        if (data.minimum_system_requirements && data.minimum_system_requirements.memory != null) {
            return (
                <View style={styles.techDataContainer}>
                    <Text style={styles.fontSmallerTitle}>Minimum Requirements</Text>
                    <Text style={styles.fontData}>{`OS: ${data.minimum_system_requirements.os}`}</Text>
                    <Text style={styles.fontData}>{data.minimum_system_requirements.processor}</Text>
                    <Text style={styles.fontData}>{`Memory: ${data.minimum_system_requirements.memory}`}</Text>
                    <Text style={styles.fontData}>{data.minimum_system_requirements.graphics}</Text>
                    <Text style={styles.fontData}>{data.minimum_system_requirements.storage}</Text>
                </View>
            )
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
                    <View>{
                        renderMinRequirements()
                    }
                    </View>
                    <View style={styles.techDataContainer}>
                        <Text style={styles.fontSmallerTitle}>Technical information</Text>
                        <Text style={styles.fontData}>{`Genre: ${data.genre}`}</Text>
                        <Text style={styles.fontData}>{`Platform: ${data.platform}`}</Text>
                        <Text style={styles.fontData}>{`Publisher: ${data.publisher}`}</Text>
                        <Text style={styles.fontData}>{`Developer: ${data.developer}`}</Text>
                        <Text style={styles.fontData}>{`Release Date: ${data.release_date}`}</Text>
                    </View>
                    <View>{
                        renderFooterContent()
                    }
                    </View>
                    <Text style={styles.gameUrl}
                        onPress={() => Linking.openURL(data.game_url)}>
                        {`${data.title} official website`}
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
        flex: 1,
        justifyContent: 'center',

    },
    scrollView: {
        backgroundColor: 'rgba(33, 33, 33, 0.9)',
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
        width: 400,
        height: 300,
        resizeMode: 'contain'
    },
    screenshotImg: {
        flex: 1,
        height: 200,
        marginTop: 5,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    techDataContainer: {
        marginTop: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(132, 207, 232, 0.1)'
    },
    gameUrl: {
        margin: 5,
        fontSize: 17,
        color: '#b0cfff',
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    gameStatus: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17
    }
})
