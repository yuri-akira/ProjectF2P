import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableHighlight
} from 'react-native';

export default ResultScreen = ({ route, navigation }) => {
    const { genre } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    const renderItem = ({ item }) => (
        <TouchableHighlight>
            <View style={styles.card}>
                <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.cardImg}
                />
                <Text style={styles.fontTitle}>{item.title}</Text>
                <Text style={styles.fontDescription}>{item.short_description}</Text>
                <Text style={styles.fontPlatform}>{item.platform}</Text>
            </View>
        </TouchableHighlight>
    )

    function renderContent() {
        if (isLoading) {
            return renderLoading();
        } else {
            return renderList();
        }
    }
    
    function renderLoading() {
        return (<ActivityIndicator size="large" color="#0000ff" />)
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

    {/* TODO feedback error using dialog */ }
    useEffect(() => {
        fetch(`https://www.freetogame.com/api/games?category=${genre}`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <ImageBackground source={require('../img/imgbground.png')} style={styles.bgImg} imageStyle={{ opacity: 0.9 }}>
            <View style={styles.container}>{
                renderContent(isLoading, data)
            }
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bgImg: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center'
    },
    cardImg: {
        flex: 1,
        height: 100,
        resizeMode: 'cover'
    },
    card: {
        backgroundColor: '#ffff',
        marginVertical: 10,
        borderWidth: 2,
        borderRadius: 5,
    },
    fontTitle: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    fontDescription: {
        marginVertical: 5,
        marginHorizontal: 15,
        textAlign: 'justify',
        fontSize: 17
    },
    fontPlatform: {
        marginHorizontal: 15,
        marginBottom: 10
    }
})
