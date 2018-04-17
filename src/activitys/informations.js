
import React, { Component } from 'react';


import {ajax} from '../activitys/Start'
import {Text, View} from "react-native";


type Props = {};
export default class Start extends Component<Props> {

    constructor(){
        super();

        props.this_=this;//Sayfalar arası geçişde kullanmak için this kaydediliyor

        this.state={
            Title_text:"Yurt Arıza Bildirim",
            Message_text:" Bilgiler Alınıyor..."
        };

        //Ajax ile sunucudan veriler çekiliyor
        ajax.getinformations(this,props)
    }


    render() {
        return (

            <View style={{flex:1,backgroundColor:"#ffffff",alignItems:"center",justifyContent:"center"}}>
                <Text style={{color:"#607D8B",fontSize:25, fontWeight:"bold"}}>
                    {this.state.Title_text}
                </Text>
                <Text style={{color:"#607D8B",fontSize:16}}>
                    {this.state.Message_text}
                </Text>

            </View>
        );
    }
}
