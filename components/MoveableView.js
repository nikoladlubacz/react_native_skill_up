import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';


function MoveableView(props) {
    const fadeAnim = useRef(new Animated.Value(props.start)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: props.end,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, props.end]);

    return (
        <Animated.View
            style={{
                ...props.style,
                transform: [
                    {
                        translateX: fadeAnim
                    },
                ],
            }}>
            {props.children}
        </Animated.View>
    );
};

export default MoveableView;