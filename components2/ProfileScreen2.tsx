import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React, { useState} from 'react'
import { styles } from '../Styles/Styles2';

const ProfileScreen = ():React.JSX.Element => {

    const [profileimage, setimage] = useState(require("../assets/j1.jpg"));
    const [name, setName] = useState("Tanachot Ketsomboon");


    const handlechangeName = ()=>{
      setName(name == "Tanachot Ketsomboon" ? "PPhetto" : "Tanachot Ketsomboon")
    }

    const handlechangeimage = ()=>{
      setimage(profileimage == require("../assets/j1.jpg") ? require("../assets/j2.jpg") : require("../assets/j1.jpg"))
    }

  return (
    <View style={styles.container}>
        <View style={styles.profileContainer}>
            <Image source={profileimage} style={styles.profileImage} />
            <View>
              <Text style={styles.profileName}>{name}</Text>
              <Button title='Change Name' onPress={handlechangeName}/>
              <Text>{"\n"}</Text>
              <Button title='Change image' onPress={handlechangeimage}/>
            </View>
        </View>
    </View>
  )
}

export default ProfileScreen

// const styles = StyleSheet.create({
//     container:{
//         alignItems:"center",
//         padding:20,
//         backgroundColor:"white",
//     },
//     profileimage:{
//         borderRadius:50,
//         width:100,
//         height:100,
//         marginRight:20,
//     },
//     profilecontainer:{
//         flexDirection:"row",
//         alignItems:"center",
//         width:"100%",
//         padding:20,
//         borderRadius:10,
//         backgroundColor:"white",
//         elevation:5,
//         marginTop:50,
//     },
//     profilename:{
//         fontSize:18,
//         color:"blue",
//     },
// })