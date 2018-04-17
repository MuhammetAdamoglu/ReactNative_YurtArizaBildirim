
import React, { Component } from 'react';

import {
    Picker
} from 'react-native';
import {Item} from "react-native/Libraries/Components/Picker/Picker";



export default class picker extends Component {


    render() {

        return (
            <Picker
                style={{flex:this.props.flex,marginLeft:this.props.marginLeft,marginRight:this.props.marginRight,marginBottom:this.props.marginBottom,marginTop:30,color: '#607D8B'}}
                selectedValue={this.props.selectedValue}
                mode={this.props.mode}
                onValueChange={this.props.onValueChange}>
                    <Picker.Item label={this.props.label} value='0' />
                    {Object.keys(this.props.options).map((key) => {
                        return (<Item label={this.props.options[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
                    })}
            </Picker>


        );
    }
}
