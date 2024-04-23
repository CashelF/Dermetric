import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadScreen from './UploadScreen';
import ResultScreen from './ResultScreen';
import ConditionsScreen from './ConditionsScreen';
const Tab = createMaterialBottomTabNavigator();


function NavigationBar() {
    return (
        <Tab.Navigator
            initialRouteName="ResultScreen"
            activeColor="#fff"
            barStyle={{ backgroundColor: '#45B3CB' }}
        >
            <Tab.Screen
                name="ResultScreen"
                component={ResultScreen}
                options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            }}
        />
            <Tab.Screen
                name="ConditionsScreen"
                component={ConditionsScreen}
                options={{
                tabBarLabel: 'Conditions',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="medical-bag" color={color} size={26} />
                ),
                }}
            />
        </Tab.Navigator>
    );
}

export default NavigationBar;