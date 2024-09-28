// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {HeaderButtonsProvider} from 'react-navigation-header-buttons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import MenuScreen from './screens/MenuScreen';
import ProductScreen from './screens/ProductScreen';
import DetailScreen from './screens/DetailScreen';

import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostScreen from './screens/PostScreen';
import {createDrawerNavigator} from "@react-navigation/drawer";
import LoginScreen from './screens/LoginScreen';
import Toast from 'react-native-toast-message';

import { Provider } from "react-redux";
import { store } from './redux-toolkit/store';

import { useAppSelector,useAppDispatch } from './redux-toolkit/hooks';
import { selectAuthState,setIsLogin,setIsLoading, setProfile } from './auth/auth-slide';
import { getProfile } from './Services/auth-service';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraScreeen from './screens/CameraScreeen';

const HomeStack = createNativeStackNavigator();
const ProducStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const LoginStack = createNativeStackNavigator();
const CameraStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabContainer(){
  return(
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
      let iconName="home";
    if (route.name === 'Home') {
    iconName = focused
    ? 'ios-information-circle'
    : 'ios-information-circle-outline';
    } else if (route.name === 'CameraStack') {
    iconName = focused ? 'camera' : 'camera-outline';
    }
    
    // You can return any component that you like here!​
    return <Ionicons name = {iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    headerShow:false,
    tabBarActiveBackgroundColor:'lightblue'
    })}
  >
    <Tab.Screen 
      name="HomeStack" 
      component={HomeStrackScreen} 
      options={{tabBarLabel:"หน้าหลัก"}}/>
    <Tab.Screen 
      name="Camer"
      component={CameraScreenStack} 
      options={{tabBarLabel:"กล้อง"}}/>
  </Tab.Navigator>
  )
}

function CameraScreenStack(){
  return(
    <CameraStack.Navigator 
    initialRouteName='Products'
    screenOptions={{
      // headerStyle:{backgroundColor:'#ffffff'},
      // headerTintColor:'white',
      headerTitleStyle:{fontWeight:'bold'}
    }}
    >
      <CameraStack.Screen name="Cameraaa" component={CameraScreeen}/>
    </CameraStack.Navigator>
  );
}

function HomeStrackScreen(){
  return(
    <HomeStack.Navigator 
    initialRouteName='Home'
    screenOptions={{
      headerStyle:{backgroundColor:'#ffffff'},
      headerTintColor:'white',
      headerTitleStyle:{fontWeight:'bold'}
    }}
    >
      <HomeStack.Screen 
      name='Home' 
      component={HomeScreen}
      options={{title: 'หน้าหลัก'}}
      />
      <HomeStack.Screen 
      name='About' 
      component={AboutScreen}
      // options={{title: 'เกี่ยวกับเรา',
      //   headerStyle: {backgroundColor:'#20b2aa'},
      //   headerTintColor:'White',
      //   headerTitleStyle:{fontWeight:'bold'},
      //   headerTitleAlign:'center'
      // }}
      />
      <HomeStack.Screen name='Post' component={PostScreen}/>
    </HomeStack.Navigator>
  )
}

function ProducStackScreen(){
  return(
    <ProducStack.Navigator 
    initialRouteName='Products'
    screenOptions={{
      // headerStyle:{backgroundColor:'#ffffff'},
      // headerTintColor:'white',
      headerTitleStyle:{fontWeight:'bold'}
    }}
    >
      <ProducStack.Screen 
      name='Products' 
      component={ProductScreen}
      options={{title: 'หน้าหลัก'}}
      />
      <ProducStack.Screen name='Post' component={PostScreen}/>
      <ProducStack.Screen name='Details' component={DetailScreen}/>
    </ProducStack.Navigator>
  )
}

function LoginScreenStack(){
  return(
    <LoginStack.Navigator 
    initialRouteName='Products'
    screenOptions={{
      // headerStyle:{backgroundColor:'#ffffff'},
      // headerTintColor:'white',
      headerTitleStyle:{fontWeight:'bold'}
    }}
    >
      <LoginStack.Screen name='Login' component={LoginScreen}/>
    </LoginStack.Navigator>
  );
}

const App = ():React.JSX.Element => {
  //ใช้ useAppSelector เพื่อดึง state จาก store
  const {isLogin,isLoading} = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();

  const checkLogin = async()=>{
    try{
      dispatch(setIsLoading(true))
      const response = await getProfile();
      if(response?.data.data.user){
        dispatch(setProfile(response.data.data.user));
        dispatch(setIsLogin(true));
      }else{
        dispatch(setIsLogin(false));
      }
    }catch(error){
      console.log(error)
    }finally{
      dispatch(setIsLoading(false));
    }
  }

  useFocusEffect(
    React.useCallback(()=>{
      checkLogin();
    },[])
  );

  if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' color='blue'/>
      </View>
    )
  }

  return (
    <>
      <HeaderButtonsProvider stackType="native">
        {isLogin?(
          <Drawer.Navigator  
          screenOptions={{headerShown: false}}
          drawerContent={props => <MenuScreen{...props}/>}
          >
            <Drawer.Screen name='Home' component={TabContainer}/>
            <Drawer.Screen name='ProducStack' component={ProducStackScreen}/>
          </Drawer.Navigator>
        ):(
          <LoginScreenStack/>
        )}
      </HeaderButtonsProvider>
    <Toast/>
    </>
  );
};

const AppWrapper = ()=>{
  return(
    <Provider store = {store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <App/>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default AppWrapper