
import React, { Component } from 'react';

import {
    View,
    Text,
    ScrollView
} from 'react-native';

import Button from 'react-native-button';

import style from '../css/style';
import {ajax} from '../activitys/Start'
import Input from "../components/input";

type Props = {};
export default class EnterPanel extends Component<Props> {

    constructor(){
        super();

        this.state={
            username:props.username,
            password:props.password
        };

        //Eğer kayıtlı veri var ise hata yok demektir
        if(props.username)
            props.errUsername=true;
        if(props.password)
            props.errPassword=true;

    }
    sendPanelQuery(){
        //Verileri ajaxa yollar
        if(props.errUsername && props.errPassword)//İnputlarda sorun yok ise
            ajax.panelquery(false,this.state.username,this.state.password)
    }

    render() {
        return (

            <View style={{flex:1}}>

                <ScrollView
                    keyboardShouldPersistTaps='always'
                    enableAutoAutomaticScroll={false} >

                    <Text style={style.textTitle}>
                        Giriş Yap
                    </Text>
                    <Text style={style.textMessage}>
                        Kullanıcı Adı ve Şifreniz ile Giriş Yapınız
                    </Text>


                    <Input
                        maxLength={30}
                        minLength={2}
                        label='Kullanıcı Adı'
                        value={this.state.username}
                        onChangeText={(data)=>{[this.setState({username:data}),props.errUsername=props.InputError,]}}
                    />

                    <Input
                        maxLength={30}
                        minLength={2}
                        label='Şifre'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(data)=>{[this.setState({password:data}),props.errPassword=props.InputError]}}
                    />

                    <View style={{flex:0.3,alignItems:'flex-end',marginBottom:18}}>
                        <Button onPress={this.sendPanelQuery.bind(this)} style={style.button}>Giriş Yap</Button>
                    </View>
                </ScrollView>


            </View>

        );
    }
}
