import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';


function ApiData() {
  const [apiData, setApiData] = useState(null);

  const fetchData = async () => {
    try {
      // Append a random query parameter to the URL to avoid caching
      const response = await fetch(`https://place.dog/300/200?${new Date().getTime()}`);
      setApiData(response.url); // Use the direct URL of the image
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch a new image when the component mounts

  const handleToggleApiData = () => {
    fetchData();
  };

  return (
    <View>
      <Text>Dog Image:</Text>
      <View>
        {apiData && (
          <View>
            <TouchableOpacity onPress={handleToggleApiData}>
              <Image source={{ uri: apiData }} style={{ width: 200, height: 300 }} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export default ApiData;

