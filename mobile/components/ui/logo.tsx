import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

const blurhash = 'LDS5-CM_JZRj$Jt2.TV@%KyE%hs7';

export default function Logo() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/images/bus-ticket-logo.png')}
                placeholder={{ blurhash }}
                contentFit="scale-down"
                transition={1000}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
    },
    image: {
        flex: 1,
    },
});
