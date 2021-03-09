import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, ImageBackground, Image, TouchableHighlight, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import colors from "./colors.js";
import 'react-native-gesture-handler'; 
//test

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
