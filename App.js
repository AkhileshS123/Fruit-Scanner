import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, ImageBackground, Image, TouchableHighlight, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import colors from "./colors.js";
import 'react-native-gesture-handler'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js";
import * as mobilenet from "@tensorflow-models/mobilenet";

const Stack = createStackNavigator();

export default function MyStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen
                    name="Scanner Screen"
                    component={ScannerScreen}
                    options={{ title: 'Scan Here' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
                
            <ImageBackground
                source={require("./assets/Fruit-Assortment.jpg")}
                style={{height: "100%", width: "100%",}}
            >
                <View style={styles.overlay}>

                    <View> 
                        <Text style={styles.title}>
                            Fresh Fruit
                        </Text>
                        <Text style={styles.subTitle}>
                            An app designed to show you how fresh your fruit is.
                        </Text>
                    </View>
                    
                    
                    
                    <Image
                        source={require("./assets/Orange-Cut.jpg")}
                        style={{ height: 200, width: 200, marginBottom: 20, opacity: 1, borderRadius: 20,}}
                    />
                
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Scanner Screen');
                                }}
                                style={{underlayColor: "#ffffff00",}}
                            >
                                <View style={styles.scanButton}>
                                    <Text style={styles.buttonText}>
                                        Scan
                                    </Text>
                                </View>
                            </TouchableOpacity>
                    
                </View>
                
            </ImageBackground>
        
        </View>
    );
  };

const ScannerScreen = ({ navigation }) => {
    const [url, setURL]=useState("https://i.pinimg.com/originals/6f/f0/7d/6ff07d9a588723df95baa124a5aaaa40.jpg");
    const [displayText, setDisplayText]=useState("Ready to Scan");

    async function getPrediction(url) {
        setDisplayText("Loading TensorFlow");
        await tf.ready();
        setDisplayText("Loading MobileNet");
        const model = await mobilenet.load()
        setDisplayText("Fetching Image");
        const response = await fetch(url, {}, {isBinary: true})
        setDisplayText("Getting Image Buffer");
        const imageData = await response.arrayBuffer();
        setDisplayText("Getting Image Tensor");
        const imageTensor = imageToTensor(imageData);
        setDisplayText("Classifying");
        const prediction = await model.classify(imageTensor);
        setDisplayText(JSON.stringify(prediction));
    }

    function imageToTensor(rawImageData) {
        const TO_UINT8ARRAY = true;
        const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
        // Drop the alpha channel info for mobilenet
        const buffer = new Uint8Array(width * height * 3);
        let offset = 0; // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
            buffer[i] = data[offset];
            buffer[i + 1] = data[offset + 1];
            buffer[i + 2] = data[offset + 2];
            offset += 4;
        }
        return tf.tensor3d(buffer, [height, width, 3]);
    }

    return (
        <View style={styles.container}>
                
            <ImageBackground
                source={require("./assets/Fruit-Assortment.jpg")}
                style={{height: "100%", width: "100%",}}
            >
                <View style={styles.overlay}>

                    <View> 
                        <Text style={styles.title}>
                            Scanner
                        </Text>
                        <Text style={styles.subTitle}>
                            Scan your fruit below. First enter your fruit URL.
                        </Text>
                    </View>
                    
                    <Image
                        source={{uri:url}}
                        style={{ height: 200, width: 200, marginBottom: 20, opacity: 1, borderRadius: 20,}}
                    />

                    <TextInput
                        style={{height: 40, width: 400, borderColor: "white", borderWidth: 1, backgroundColor: "white", color: "orange", borderRadius: 20, padding: 10}}
                        onChangeText={text=>setURL(text)}
                        value={url}
                    />
                
                    <TouchableOpacity
                        onPress={() => getPrediction(url)}
                        style={{underlayColor: "#ffffff00",}}
                    >
                        <View style={styles.scanButton}>
                            <Text style={styles.buttonText}>
                                Scan Fruit
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={{color:"white", textAlign: "center", marginTop: 20}}>{displayText}</Text>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={{underlayColor: "#ffffff00",}}
                    >
                        <View style={styles.scanButton}>
                            <Text style={styles.buttonText}>
                                Back to Home
                            </Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                
            </ImageBackground>
        
        </View>
    );
};

/*
export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                
                <ImageBackground
                    source={require("./assets/Fruit-Assortment.jpg")}
                    style={{height: "100%", width: "100%",}}
                >
                    <View style={styles.overlay}>

                        <View> 
                            <Text style={styles.title}>
                                Fresh Fruit
                            </Text>
                            <Text style={styles.subTitle}>
                                An app designed to show you how fresh your fruit is.
                            </Text>
                        </View>
                        
                        
                        
                        <Image
                            source={require("./assets/Orange-Cut.jpg")}
                            style={{ height: 200, width: 200, marginBottom: 20, opacity: 1, borderRadius: 20,}}
                        />
                    
                                <TouchableOpacity
                                    onPress={() => {
                                        alert('Fruit Scanned!')
                                    }}
                                    style={{underlayColor: "#ffffff00",}}
                                >
                                    <View style={styles.scanButton}>
                                        <Text style={styles.buttonText}>
                                            Scan
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                        
                    </View>
                    
                </ImageBackground>
                
            </View>
        );
    }
}
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    title: {
        fontSize: 50,
        color: colors.primary,
        marginBottom: 15,
        textAlign: "center"
    },
    
    subTitle: {
        fontSize: 15,
        color: "white",
        marginBottom: 25,
        lineHeight: 25,
        textAlign: "center",
        width: 230,
    },
    
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        height: "100%",
        width: "100%",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    
    scanButton: {
        backgroundColor: colors.primary,
        width: 230,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginTop: 20,
    },
    
    buttonText: {
        color: colors.white,
        textTransform: "uppercase",
        fontSize: 15,
        letterSpacing: 1,
    }
});
