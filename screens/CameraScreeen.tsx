import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { CameraView,CameraType,useCameraPermissions } from 'expo-camera'
import { TouchableOpacity } from 'react-native-gesture-handler';

const CameraScreeen = () => {
    const [facing,setFacing] = useState<CameraType>('back');
    const [permission,requestPermission] = useCameraPermissions();

    if(!permission){
        //Camera Permission are still loading.
        return <View/>;
    }
    if(!permission.granted){
        //Camera Permission are not granted.
        return(
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission"/>
            </View>
        )
    }

function toggleCameraFacing(){
    setFacing(current => (current==='back'?'front':'back'))
}

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  )
}

export default CameraScreeen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});