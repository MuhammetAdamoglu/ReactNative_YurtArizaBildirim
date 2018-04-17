
import React, { Component } from 'react';

import { Hoshi } from 'react-native-textinput-effects';

export default class input extends Component {

    constructor(){
        super();

        this.state={
            error:"#607D8B",
            value:""
        };
    }


    TrueEror(){
        //İnput hatalı ise
        this.setState({error: "red"});
        props.InputError=false
    }

    FalseEror(){
        //İnput hatalı değil ise
        this.setState({error: "#607D8B"});
        props.InputError=true
    }

    onListener(value,min){

        if(value.length<min){//min değerden az ise
            this.TrueEror();
        }
        else{//çok ise
            this.FalseEror();
        }


        switch (this.props.textType) {//input tipi
            case "email"://mail ise
                //mail regex i kullanıldı
                const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!reEmail.test(String(value).toLowerCase())){
                    this.TrueEror()
                }
                else{
                    this.FalseEror()
                }
                break;
            case "phone"://telefon ise
                //telefon regexi kullanıldı
                const rePhone = /^5\d{2}\d{3}\d{4}$/;
                if(!rePhone.test(String(value).toLowerCase())){
                    this.TrueEror()
                }
                else{
                    this.FalseEror()
                }
                break;
            case "re_password"://tekrar şifre ise
                if(props.password_c!==value){
                    this.TrueEror()
                }else {
                    this.FalseEror()
                }
                break;
        }
    }


    render() {


        return (

            <Hoshi
                maxLength={this.props.maxLength}
                label={this.props.label}
                style={{flex:this.props.flex, marginLeft:20, marginRight:20, marginTop:20, padding:20}}
                keyboardType={this.props.keyboardType}
                value={this.props.value}
                multiline={this.props.multiline}
                onChange={(event) => {this.onListener(event.nativeEvent.text,this.props.minLength)}}
                onChangeText={this.props.onChangeText}
                secureTextEntry={this.props.secureTextEntry}
                borderColor={this.state.error}
                autoCapitalize={'none'}
                autoCorrect={false}
            />


        );
    }
}
