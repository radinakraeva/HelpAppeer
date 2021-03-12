import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

export default function ImagePreview({filePath }) {
    return (
        <View style={styles.imageContainer}>
        <Image
            source={filePath}
            style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    imageContainer: {
        height:120,
        width:120,
    },
    image: {
        margin:10,
        height:100,
        width:100,

        },
});
