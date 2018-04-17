/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';



import {
    View,
    Text,
    ScrollView,
    AsyncStorage
} from 'react-native';


import Button from 'react-native-button';


import style from '../css/style'
import {ajax} from '../activitys/Start'
import EnterPanel from "../activitys/EnterPanel";
import Input from "../components/input";


const ScrollableTabView = require('react-native-scrollable-tab-view');

type Props = {};
export default class TcQuery extends Component<Props> {


    constructor(){
        super();

        this.state={
            tcNo:props.tcNo,
            year:props.year,
            name:props.name,
            surname:props.surname
        };


        //Eğer kayıtlı veri var ise hata yok demektir
        if(props.tcNo)
            props.errTcno=true;
        if(props.year)
            props.errYear=true;
        if(props.name)
            props.errName=true;
        if(props.surname)
            props.errSurname=true;

    }

    static sendTcQuery(){
        //Veriler ajaxa gönderiliyor
        if(props.errTcno && props.errYear && props.errName && props.errSurname)//İnputlarda sorun yok ise
            ajax.tcquery(this.state.tcNo,this.state.year,this.state.name,this.state.surname);

    }


    render() {
        return (

            <View style={{flex:1}}>
                <View style={style.topContainer}/>
                <View style={style.bottomContainer}>
                    <View style={style.cardView}>
                        <ScrollableTabView
                            prerenderingSiblingsNumber={1}
                            tabBarUnderlineStyle ={{backgroundColor:"#607D8B", height:2}}
                            tabBarTextStyle ={{color:"#607D8B", fontSize:15,}} >
                            <View style={{flex:1}} tabLabel="SORGULA">
                                <ScrollView
                                    keyboardShouldPersistTaps='always'
                                    enableAutoAutomaticScroll={false}>

                                    <Text style={style.textTitle}>
                                        Kimlik Doğrulama
                                    </Text>
                                    <Text style={style.textMessage}>
                                        Arıza Bildiriminiz İçin Kimlik Bilgilerinizi Doğrulamalısınız
                                    </Text>

                                    <View style={{flexDirection:'row'}}>
                                        <Input
                                            maxLength={11}
                                            minLength={11}
                                            label='Tc Kimlik'
                                            keyboardType='numeric'
                                            flex={0.8}
                                            value={this.state.tcNo}
                                            onChangeText={(data)=>{[this.setState({tcNo:data}),props.errTcno=props.InputError]}}
                                        />

                                        <Input
                                            maxLength={4}
                                            minLength={4}
                                            label='Yıl'
                                            keyboardType='numeric'
                                            flex={0.3}
                                            value={this.state.year}
                                            onChangeText={(data)=>{[this.setState({year:data}),props.errYear=props.InputError]}}
                                        />

                                    </View>

                                    <Input
                                        maxLength={30}
                                        minLength={2}
                                        label='İsim'
                                        value={this.state.name}
                                        onChangeText={(data)=>{[this.setState({name:data}),props.errName=props.InputError]}}
                                    />
                                    <Input
                                        maxLength={30}
                                        minLength={2}
                                        label='Soyisim'
                                        value={this.state.surname}
                                        onChangeText={(data)=>{[this.setState({surname:data}),props.errSurname=props.InputError]}}
                                    />

                                    <View style={{flex:0.6,alignItems:'flex-end',marginBottom:30}}>
                                        <Button style={style.button} onPress={TcQuery.sendTcQuery.bind(this)}>Sorgula</Button>
                                    </View>
                                </ScrollView>
                            </View>

                            <EnterPanel tabLabel="GİRİŞ YAP"/>
                        </ScrollableTabView>
                    </View>

                </View>
            </View>

        );
    }
}
