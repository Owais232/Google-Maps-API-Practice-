import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  useEffect(() => {
    if (pickup.length > 0) {
      fetchSuggestions(pickup, setPickupSuggestions);
    } else {
      setPickupSuggestions([]);
    }
  }, [pickup]);

  useEffect(() => {
    if (destination.length > 0) {
      fetchSuggestions(destination, setDestinationSuggestions);
    } else {
      setDestinationSuggestions([]);
    }
  }, [destination]);

  const fetchSuggestions = async (value, setSuggestions) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=YOUR_GOOGLE_MAPS_API_KEY&input=${value}&types=(cities)`
      );
      const data = await response.json();
      if (data.predictions) {
        setSuggestions(data.predictions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleContinue = () => {
    // Handle continue button press
    console.log('Continue button pressed');
    console.log('Pickup:', pickup);
    console.log('Destination:', destination);
    // You can add further logic here
  };

  const renderPickupItem = ({ item }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => setPickup(item.description)}>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderDestinationItem = ({ item }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => setDestination(item.description)}>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Enter Pickup and Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Pickup"
          value={pickup}
          onChangeText={setPickup}
        />
        <FlatList
          data={pickupSuggestions}
          renderItem={renderPickupItem}
          keyExtractor={(item) => item.id}
          style={styles.suggestionList}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Destination"
          value={destination}
          onChangeText={setDestination}
        />
        <FlatList
          data={destinationSuggestions}
          renderItem={renderDestinationItem}
          keyExtractor={(item) => item.id}
          style={styles.suggestionList}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    width: '100%',
  },
  suggestionList: {
    width: '100%',
    maxHeight: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  suggestionItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    backgroundColor: '#003f5c', // Dark blue shade color
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Home;
