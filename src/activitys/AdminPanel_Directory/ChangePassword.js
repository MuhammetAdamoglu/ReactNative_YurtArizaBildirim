

import React, { Component } from 'react';



import {
    View,
    ScrollView

} from 'react-native';


import style from '../../css/style'
import {ajax} from '../Start'

import Input from "../../components/input";
import Button from "react-native-button";



type Props = {};

export default class ChangePassword extends Component<Props> {


    constructor(){
        super();

        this.state={
            password_change:"",
            password_new:"",
            password_again_new:""
        }
    }

    static reset(this_){
        this_.setState({
            password_change:"",
            password_new:"",
            password_again_new:""})
    }

    change(){
        //İnputlarda sorun yok ise verileri ajaxa yollar
        if(props.errPassword_change && props.errPassword_new && props.errPasswordAgain_new){
            ajax.changePassword(this,this.state.password_change,this.state.password_new,"admin");
        }
    }

    render() {

        return (

            <ScrollView style={{flex:1}}
                        keyboardShouldPersistTaps='always'
                        enableAutoAutomaticScroll={false}>
                <Input
                    maxLength={30}
                    minLength={5}
                    label='Şifre'
                    secureTextEntry={true}
                    onChangeText={(data)=>{[this.setState({password_change:data}),props.errPassword_change=props.InputError]}}
                    value={this.state.password_change}

                />

                <Input
                    maxLength={30}
                    minLength={5}
                    label='Yeni Şifre'
                    secureTextEntry={true}
                    onChangeText={(data)=>{[this.setState({password_new:data}),props.password_c=data,props.errPassword_new=props.InputError]}}
                    value={this.state.password_new}
                />

                <Input
                    maxLength={30}
                    minLength={5}
                    label='Yeni Şifre Tekrar'
                    secureTextEntry={true}
                    onChangeText={(data)=>{[this.setState({password_again_new:data}),props.errPasswordAgain_new=props.InputError]}}
                    value={this.state.password_again_new}
                    textType={"re_password"}
                />


                <View style={{flex:0.6,alignItems:'flex-end',marginBottom:10}}>
                    <Button style={[style.button,{fontSize:18}]} onPress={this.change.bind(this)} >Değiş</Button>
                </View>
            </ScrollView>


        );
    }


}


