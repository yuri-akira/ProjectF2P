import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Text,
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
                {/* TODO insert data*/}
            </ScrollView>
        )
    }
    //TODO get data from API

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
        margin: 10
    }
})
