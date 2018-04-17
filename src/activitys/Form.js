/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
    View,
    Text,
    ScrollView

} from 'react-native';


import Button from 'react-native-button';


import style from '../css/style'
import {ajax} from '../activitys/Start'

import informations from "../scripts/informations";
import Input from "../components/input";
import CustomPicker from "../components/picker";

type Props = {};
export default class Form extends Component<Props> {


    constructor(props){
        super(props);

        this.state={

            jop:"",
            blok:"",
            room:"",

            email:"",
            phone:"",
            complaint:""
        }
    }


    sendFormQuery(){
        //Verileri ajaxa yollar
        if(props.errJop && props.errEmail && props.errBlok && props.errRoom && props.errPhone && props.errComplaint)//İnputlarda sorun yok ise
            ajax.sendform(props.tcNo,this.state.year,props.name,props.surname,this.state.email,this.state.phone,this.state.complaint,this.state.blok,this.state.room,this.state.jop)

    }

    render() {

        return (

            <View style={{flex:1}}>
                <View style={style.topContainer}/>
                <View style={style.bottomContainer}>
                    <View style={style.cardView}>
                        <ScrollView
                            keyboardShouldPersistTaps='always'
                            enableAutoAutomaticScroll={false}>

                            <Text style={style.textTitle}>
                                ARIZA BİLDİRİMİ
                            </Text>
                            <Text style={style.textMessage}>
                                Bize Arızayı Bildiriniz
                            </Text>


                            <CustomPicker
                                selectedValue={this.state.jop}
                                label={'Arıza Seçiniz'}
                                options={informations.getJop()}
                                marginLeft={30}
                                marginRight={30}
                                flex={1}
                                onValueChange={(itemValue) => [this.setState({jop: itemValue}),props.errJop=true]}/>

                            <Input
                                maxLength={40}
                                minLength={3}
                                keyboardType='email-address'
                                label='E-mail'
                                textType={"email"}
                                value={this.state.email}
                                onChangeText={(data)=>{[this.setState({email:data}),props.errEmail=props.InputError]}}
                            />

                            <View style={{flex:1, flexDirection:'row',marginTop:20}}>

                                <CustomPicker
                                    selectedValue={this.state.blok}
                                    marginLeft={30}
                                    marginRight={5}
                                    flex={3}
                                    label={'Blok'}
                                    options={informations.getBlok()}
                                    onValueChange={(itemValue) => [this.setState({blok: itemValue}),props.errBlok=true]}/>

                                <CustomPicker
                                    selectedValue={this.state.room}
                                    marginLeft={5}
                                    marginRight={30}
                                    flex={2}
                                    label={'Oda'}
                                    options={informations.getRoom()}
                                    onValueChange={(itemValue) => [this.setState({room: itemValue}),props.errRoom=true]}/>

                            </View>

                            <Input
                                maxLength={10}
                                minLength={10}
                                keyboardType='phone-pad'
                                label='Telefon(5XXXXXXXXX)'
                                textType={"phone"}
                                value={this.state.phone}
                                onChangeText={(data)=>{[this.setState({phone:data}),props.errPhone=props.InputError]}}
                            />
                            <Input
                                maxLength={100}
                                minLength={5}
                                multiline = {true}
                                label='Şikayetiniz'
                                value={this.state.complaint}
                                onChangeText={(data)=>{[this.setState({complaint:data}),props.errComplaint=props.InputError]}}
                            />

                            <View style={{flex:0.6,alignItems:'flex-end',marginTop:30,marginBottom:10}}>
                                <Button style={style.button} onPress={this.sendFormQuery.bind(this)} >Gönder</Button>
                            </View>
                        </ScrollView>

                    </View>
                </View>
            </View>

        );
    }
}
