import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const CarouselPage = () => {
    const carouselData = [
        {
            id: 1,
            image: require('../assets/image.jpg')
        },
        {
            id: 2,
            image: require('../assets/image.jpg')
        },
        {
            id: 3,
            image: require('../assets/image.jpg')
        },
    ];

    const screenWidth = Dimensions.get("window").width
    const [activeIndex, setActiveIndex] = useState(0)
    const flatlistRef = useRef()


    useEffect(() => {
      let intervel =  setInterval(() => {
            if (activeIndex === carouselData.length - 1) {
                flatlistRef.current.scrollToIndex({
                    index: 0,
                    animation: true,
                })
            }
            else {
                flatlistRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animation: true,
                })
            }
        }, 3000)

        return () =>clearInterval(intervel)
    })

    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: (screenWidth-20) * index,
        index: index,
    })



    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={{ width: screenWidth-20}}>
                <Image source={item.image} style={{ height: 220, width: screenWidth-20 }} />
            </View>
        )
    }
    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        // console.log({scrollPosition})
        index = Math.ceil(scrollPosition / screenWidth)
        // console.log({index})
        setActiveIndex(index)
    }

    const renderDotIndicator = () => (
        carouselData.map((dot, index) => {
            //if activeIndex === index
            if (activeIndex === index) {

                return (
                    <View key={index} style={{ backgroundColor: 'white', height: 10, width: 10, borderRadius: 5, marginHorizontal: 6 }}>

                    </View>
                )
            }
            else {

                return (<View key={index} style={{ backgroundColor: '#9084ae', height: 10, width: 10, borderRadius: 5, marginHorizontal: 6 }}>

                </View>)
            }

        })
    )
    return (
        <SafeAreaView>

            <FlatList
                data={carouselData}
                renderItem={renderItem}
                getItemLayout={getItemLayout}
                ref={flatlistRef}
                keyExtractor={(item) => item.id}
                horizontal={true}
                pagingEnabled={true}
                onScroll={handleScroll}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center',marginTop:-20 }}>
                {renderDotIndicator()}

            </View>
        </SafeAreaView>

    )
}

export default CarouselPage

const styles = StyleSheet.create({})