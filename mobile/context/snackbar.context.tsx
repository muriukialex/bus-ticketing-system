import React, { createContext, FC, ReactNode, useContext, useState } from 'react'
import { Snackbar } from 'react-native-paper'

interface SnackBarProperties {
	label: string
	onPress: () => void
}

interface AppSnackBarProps {
	visible: boolean
	onDismissSnackBar: () => void
	snackBarProperties: SnackBarProperties
	children?: ReactNode
}

const SnackbarContext = createContext<{
	showNotification: (props: Omit<AppSnackBarProps, 'visible'>) => void
}>({
	showNotification: () => {},
})

export const SnackbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const DEFAULT_DURATION_TIME = 5000

	const onDismissSnackBar = () => {
		setSnackbarProps(prev => ({ ...prev, visible: false }))
	}

	const [snackbarProps, setSnackbarProps] = useState<AppSnackBarProps>({
		visible: false,
		onDismissSnackBar: onDismissSnackBar,
		snackBarProperties: {
			label: '',
			onPress: () => {
				setSnackbarProps(prev => ({ ...prev, visible: false }))
			},
		},
		children: null,
	})

	const showNotification = (props: Omit<AppSnackBarProps, 'visible'>) => {
		setSnackbarProps({ ...props, visible: true })
	}

	return (
		<SnackbarContext.Provider value={{ showNotification }}>
			{children}
			<Snackbar
				duration={DEFAULT_DURATION_TIME}
				visible={snackbarProps.visible}
				onDismiss={onDismissSnackBar}
				action={{
					label: snackbarProps.snackBarProperties.label,
					onPress: snackbarProps.snackBarProperties.onPress,
				}}>
				{snackbarProps.children}
			</Snackbar>
		</SnackbarContext.Provider>
	)
}

export const useNotification = () => useContext(SnackbarContext)
