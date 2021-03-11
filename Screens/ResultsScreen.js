import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const renderItem = ({ item }) => (
  <TouchableHighlight>
    <View style={styles.card}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.img}
      />

      <Text style={styles.fontTitle}>{item.title}</Text>
      <Text style={styles.fontPlatform}>{item.platform}</Text>
    </View>
  </TouchableHighlight>
)

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://www.freetogame.com/api/games?category=shooter')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  img: {
    width: 400,
    height: 100
  },
  card: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  fontTitle: {
    paddingHorizontal: 5,
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: 'bold'
  },
  fontPlatform: {
    paddingHorizontal: 5,
    paddingBottom: 5
  }
})
