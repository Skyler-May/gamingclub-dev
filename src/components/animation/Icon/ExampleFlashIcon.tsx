import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExampleFlashIcon: React.FC = () => {
    const [showBannerIcon, setShowBannerIcon] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowBannerIcon((prevShowBannerIcon) => !prevShowBannerIcon);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={[styles.BannerIconContainer, showBannerIcon && styles.flashing]}>
            <Text>&#128226;</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    BannerIconContainer: {
        backgroundColor: 'green',
        // width: 20,
        // height: 20,
        // position: 'absolute',
        // top: 225,
        // left: 0,
        // right: 0,
    },
    flashing: {
        opacity: 0,
    },
});

export default ExampleFlashIcon;
