import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

export const storeData = async (key: string, value: string | object) => {
	if (typeof value === 'string') {
		try {
			await AsyncStorage.setItem(key, value)
		} catch (e) {
			console.error(JSON.stringify(e))
		}
	} else {
		try {
			const jsonValue = JSON.stringify(value)
			await AsyncStorage.setItem(key, jsonValue)
		} catch (e) {
			console.error(JSON.stringify(e))
		}
	}
}

export const getData = async (key: string) => {
	try {
		const value = await AsyncStorage.getItem(key)
		if (value !== null) {
			if (typeof value === 'string') {
				return value
			} else {
				return value != null ? JSON.parse(value) : null
			}
		}
	} catch (e) {
		console.error(JSON.stringify(e))
	}
}

export const securelyStoreData = async (key: string, value: string | object) => {
	if (typeof value === 'string') {
		try {
			await SecureStore.setItemAsync(key, value)
		} catch (e) {
			console.error(JSON.stringify(e))
		}
	} else {
		try {
			const jsonValue = JSON.stringify(value)
			await SecureStore.setItemAsync(key, jsonValue)
		} catch (e) {
			console.error(JSON.stringify(e))
		}
	}
}

export const getSecurelyStoredData = async (key: string) => {
	try {
		const value = await SecureStore.getItemAsync(key)
		if (value !== null) {
			if (typeof value === 'string') {
				return value
			} else {
				return value != null ? JSON.parse(value) : null
			}
		}
	} catch (e) {
		console.error(JSON.stringify(e))
	}
}

export const removeSecurelyStoredData = async (key: string) => {
	try {
		await SecureStore.deleteItemAsync(key)
	} catch (e) {
		console.error(JSON.stringify(e))
	}
}