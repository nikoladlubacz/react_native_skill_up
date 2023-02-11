import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';


function FadeInView(props) {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    });

    return (
        <Animated.View
            style={{
                ...props.style,
                // opacity: opacity,
                transform: [
                    {
                        scale: opacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                        })
                    },
                ],
            }}>
            {props.children}
        </Animated.View>
    );
}

export default FadeInView;