import React from 'react'
import {
    View, 
    Text, 
    TouchableOpacity,
    Easing,
    StyleSheet,
    Dimensions,
    Image,
    SafeAreaViewBase, 
    FlatList,


} from 'react-native'

//import styles from './style'
import API_KEY from '../../../config/key'

const API_URL = `https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20`

const width = Dimensions.get('window').width
const height =  Dimensions.get('window').height

const IMAGE_SIZE = 80
const SPACING = 10

const fetchImagesFromPexel = async() => {
    const data  = await fetch(API_URL, {
        headers:{
            'Authorization': API_KEY.access_key
        }
    })

    const { photos } = await data.json()

    return photos
}


const Home = ( ) => {

    const [images, setImages] = React.useState(null)

  

    React.useEffect(() => {
        const fetchImages = async() => {
            const getImages = await fetchImagesFromPexel()
            setImages(getImages)
        }

        fetchImages()
    }, [])

    const topRef = React.useRef()
    const thumbRef = React.useRef()
    const [activeIndex, setActiveIndex] = React.useState(0)

    const scrollToActiveIndex = (index) => {
        setActiveIndex(index)
        topRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true
        })

        if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2){
            thumbRef?.current?.scrollToOffset({
                offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE/2,
                animated:true
            })
        } else{
            thumbRef?.current?.scrollToOffset({
                offset: 0,
                animated:true
            })
        }

    }

    if(!images){
        return <Text style={{fontSize:40}}>Loading...</Text>
    }
    return (
    

    <View style={{backgroundColor:'#000'}} >
        <FlatList 
            ref={topRef}
            data={images}
            keyExtractor={item => item.id.toString()}
            horizontal
            pagingEnabled
            onMomentumScrollEnd={event => {
                scrollToActiveIndex(Math.floor(event.nativeEvent.contentOffset.x / width))
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
                return <View style={{width, height}}>

                    <Image 
                        source={{uri: item.src.portrait}}
                        style={[StyleSheet.absoluteFillObject]}
                    />

                </View>
            }}
        
        
        />

    <FlatList 
        ref={thumbRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{position: 'absolute', bottom: IMAGE_SIZE}}
        contentContainerStyle={{paddingHorizontal: SPACING}}
        renderItem={({item, index}) => {
            return  <TouchableOpacity
            
                onPress = {() => scrollToActiveIndex(index)}
            >

                <Image 
                    source={{uri: item.src.portrait}}
                    style={{
                        height: IMAGE_SIZE,
                        width: IMAGE_SIZE,
                        borderRadius: 12,
                        marginRight: SPACING,
                        borderWidth:2, 
                        borderColor: activeIndex === index ? '#fff' : 'transparent'
                    }}
                />

            </TouchableOpacity>
          
        }}
    
    
    />
        
    </View>
    
    )
}

export default Home