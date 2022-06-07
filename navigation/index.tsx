import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootDrawerParamList, RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Onboarding from '../screens/Onboarding';
import { useStore } from '../stores/useStore';
import Homescreen from '../screens/Homescreen';
import CTAScreen from '../screens/CTAScreen';
import theme from '../components/styles/theme';
import BookingScreen from '../screens/BookingScreen';
import ReservationsScreen from '../screens/ReservationsScreen';

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<DrawerNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	const user = useStore().user;

	return (
		<Stack.Navigator
			screenOptions={{
				contentStyle: { backgroundColor: theme.colors.light },
			}}
		>
			{user ? (
				<>
					<Stack.Screen
						name={'Homescreen'}
						component={Homescreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name={'Profile'}
						component={ProfileScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={'BookingScreen'}
						component={BookingScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name={'Reservations'}
						component={ReservationsScreen}
						options={{
							headerShown: false,
						}}
					/>
				</>
			) : (
				<>
					<Stack.Screen
						name={'Onboarding'}
						component={Onboarding}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={'SignIn'}
						component={SignInScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name={'SignUp'}
						component={SignUpScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name={'CTAScreen'}
						component={CTAScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = () => {
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen
				name={'Home'}
				component={RootNavigator}
				options={{
					headerShown: false,
				}}
			/>
			<Drawer.Screen
				name={'Profile'}
				component={ProfileScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Drawer.Screen
				name={'Reservations'}
				component={ReservationsScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Drawer.Navigator>
	);
};
