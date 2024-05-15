import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Image, Dimensions, Text, StyleSheet } from 'react-native';

interface CarouselProps {
    images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [active, setActive] = useState(0);
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 2000); // 每2秒自动轮播一次

        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ x: Dimensions.get('window').width * active, animated: true });
        }
    }, [active]);

    const onMomentumScrollEnd = ({ nativeEvent }: any) => {
        let slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide === images.length) {
            scrollRef.current?.scrollTo({ x: Dimensions.get('window').width, animated: false });
            setActive(0);
        } else if (slide === 0) {
            scrollRef.current?.scrollTo({ x: Dimensions.get('window').width * (images.length - 1), animated: false });
            setActive(images.length - 1);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollRef}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                onMomentumScrollEnd={onMomentumScrollEnd}
            >
                {images.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        style={styles.image}
                    />
                ))}
            </ScrollView>
            <View style={styles.indicator}>
                {images.map((_, index) => (
                    <Text key={index} style={index === active ? styles.activeDot : styles.dot}>
                        ⬤
                    </Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
    },
    scrollView: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
    indicator: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    dot: {
        color: 'gray',
    },
    activeDot: {
        color: 'white',
    },
});

export default Carousel;
