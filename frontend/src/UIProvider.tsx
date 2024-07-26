import {createContext, useState, useContext, ReactNode} from 'react';
import Loading from "./components/atoms/Loading.tsx";
import Alert from "./components/molecules/Alert.tsx";

interface UIContextType {
	isLoading: boolean;
	showLoading: () => void;
	hideLoading: () => void;
	alert: string | null;
	showAlert: ({message}: {message: string}) => void;
	hideAlert: () => void;
}

const UIContext = createContext<UIContextType>({
	isLoading: false,
	showLoading: () => {},
	hideLoading: () => {},
	alert: null,
	showAlert: () => {},
	hideAlert: () => {},
});

export const UIProvider = ({ children }: {children: ReactNode}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [alert, setAlert] = useState<string | null>(null);
	const [alertType, setAlertType] = useState<'success' | 'error'>('success');

	const showLoading = () => setIsLoading(true);
	const hideLoading = () => setIsLoading(false);
	const showAlert = ({message, type}: {
		message: string;
		type?: 'success' | 'error';
	}) => {
		setAlert(message);
		setAlertType(type ?? 'success');
		setTimeout(() => {
			setAlert(null);
		}, 5000);
	};
	const hideAlert = () => setAlert(null);

	return (
		<UIContext.Provider value={{ isLoading, showLoading, hideLoading, alert, showAlert, hideAlert }}>
			{isLoading && (
				<Loading />
			)}
			{alert && (
				<Alert message={alert} type={alertType}/>
			)}
			{children}
		</UIContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUIMessages = () => useContext(UIContext);
