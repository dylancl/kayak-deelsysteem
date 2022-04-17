import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Formik } from 'formik';
import React from 'react';
import {
	Button,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { auth } from '../config/firebase';
import { log } from '../config/logger';
import { userStore } from '../stores/userStore';
import { RootStackScreenProps } from '../types';
import { handleFirebaseError } from '../utils';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required'),
});

const SignInScreen = ({ navigation }: RootStackScreenProps<'SignIn'>) => {
	const setUser = userStore().setUser;

	const signInMutation = useAuthSignInWithEmailAndPassword(auth, {
		onMutate: (values) => {
			log.info(`[SignInScreen.onMutate] login attempt | ${values.email}`);
		},
		onError: (error: FirebaseError) => {
			log.error(`[SignInScreen.onError] login error | ${error.message}`);
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: handleFirebaseError(error),
			});
		},
		onSuccess: (result) => {
			log.info(
				`[SignInScreen.onSuccess] login success | ${
					result.user.email as string
				}`
			);

			setUser(result.user);

			navigation.navigate('Profile');
		},
	});

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			onSubmit={(values) => {
				signInMutation.mutate(values);
			}}
			validationSchema={validationSchema}
		>
			{({
				handleChange,
				handleBlur,
				isValid,
				handleSubmit,
				values,
				touched,
				errors,
			}) => (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.container}
				>
					<Text>Email</Text>
					<TextInput
						value={values.email}
						onChangeText={handleChange('email')}
						onBlur={handleBlur('email')}
						style={styles.input}
						autoCapitalize="none"
						autoCompleteType="email"
					/>
					{errors.email && touched.email && (
						<Text style={styles.errorText}>{errors.email}</Text>
					)}

					<Text>Password</Text>
					<TextInput
						value={values.password}
						onChangeText={handleChange('password')}
						onBlur={handleBlur('password')}
						style={styles.input}
						autoCapitalize="none"
						secureTextEntry
						autoCompleteType="password"
					/>
					{errors.password && touched.password && (
						<Text style={styles.errorText}>{errors.password}</Text>
					)}
					<Button
						title="Sign In"
						disabled={signInMutation.isLoading || !isValid}
						onPress={handleSubmit as () => void}
					/>
				</KeyboardAvoidingView>
			)}
		</Formik>
	);
};

export default SignInScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	input: {
		borderColor: 'black',
		borderWidth: 2,
		width: '100%',
		padding: 10,
	},
	button: {
		marginTop: 20,
	},
	errorText: {
		color: 'red',
		fontWeight: 'bold',
		marginVertical: 10,
	},
});
