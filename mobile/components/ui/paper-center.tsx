import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PaperCenterProps {
    children: React.ReactNode;
}

const PaperCenter = ({ children }: PaperCenterProps) => {
    return (
        <SafeAreaView style={styles.safeAreaStyles}>
            <View style={styles.container}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaStyles: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
    },
});

export default PaperCenter;
