import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Alert
} from 'react-native';

export default ResultScreen = ({ route, navigation }) => {
    const { genre } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`https://www.freetogame.com/api/games?category=${genre}`)
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

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Details', {
                gameId : item.id
            })} >
            <View style={styles.card}>
                <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.cardImg}
                />
                <Text style={styles.fontTitle}>{item.title}</Text>
                <Text style={styles.fontDescription}>{item.short_description}</Text>
                <Text style={styles.fontPlatform}>{item.platform}</Text>
            </View>
        </TouchableOpacity>
    )

    function renderContent() {
        if (isLoading) {
            return renderLoading();
        } else {
            return renderList();
        }
    }

    function renderLoading() {
        return (<ActivityIndicator size="large" color="#FFFF" />)
    }

    function renderList() {
        return (
            <FlatList
                data={data}
                keyExtractor={({ id }) => id.toString()}
                renderItem={renderItem}
            />
        )
    }

    return (
        <ImageBackground source={require('../img/imgbground.png')} style={styles.bgImg} imageStyle={{ opacity: 0.9 }}>
            <View style={styles.container}>{
                renderContent()
            }
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    bgImg: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center'
    },
    cardImg: {
        flex: 1,
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'cover'
    },
    card: {
        backgroundColor: '#212121',
        marginVertical: 10,
        borderRadius: 10,
    },
    fontTitle: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ffff',
    },
    fontDescription: {
        marginVertical: 5,
        marginHorizontal: 15,
        textAlign: 'justify',
        color: '#ffff',
        fontSize: 17
    },
    fontPlatform: {
        marginHorizontal: 15,
        color: '#ffff',
        marginBottom: 10
    }
})
