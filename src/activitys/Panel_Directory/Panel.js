


import React, { Component } from 'react';

import {
    View,
    Text, AsyncStorage

} from 'react-native';


import style from "../../css/style";
import Button from "react-native-button";

import GetMalfunction from "./GetMalfunctions_Panel";
const ScrollableTabView = require('react-native-scrollable-tab-view');
import ChangePassword from "./ChangePassword_Panel";


type Props = {};
export default class Panel extends Component<Props> {

    constructor(){
        super();

        //Ekranı güncellemek için state kullanıldı
        this.state={
            update:""
        };

    }

    exit(){
        //Kayıtlı kullanıcı adı ve parolayı silerek panelden çıkış yapar
        AsyncStorage.removeItem("username");
        AsyncStorage.removeItem("password");

        props.username="";
        props.password="";

        //Anasayfaya yönlendirilir
        this.props.navigator.push({
            id:"TcQuery"
        });
    }


    render() {

        return (

            <View style={{flex:1}}>
                <Text style={{height:0}}>{this.state.update}</Text>
                <View style={{flex:0.15,backgroundColor:"#607D8B",flexDirection:'row'}}>
                    <View style={{flex:1,alignItems:'flex-start'}}>
                        <Text style={{fontSize:18, fontWeight:"bold", color:"white", marginBottom:10, marginTop:15,marginLeft:33}}>{props.userData["meslek"]} Panel</Text>
                    </View>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Button style={[style.button,{fontSize:16,color:"white",marginBottom:10, marginTop:15,marginRight:33}]} onPress={this.exit.bind(this)} >Çıkış Yap</Button>
                    </View>
                </View>

                <ScrollableTabView
                    prerenderingSiblingsNumber={1}
                    tabBarUnderlineStyle ={{backgroundColor:"#607D8B", height:2}}
                    tabBarTextStyle ={{color:"#607D8B", fontSize:15,}} >

                    <GetMalfunction tabLabel="Arizalar"/>
                    <ChangePassword tabLabel="Şifre Değiş"/>

                </ScrollableTabView>

            </View>

        );
    }


}
