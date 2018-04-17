<?php
    include 'Information.php';

    if($_POST){
        //Bilgileri alır ve ajaxa gönderir
        $information=new Information();

        $jop=$information->jop();
        $blok=$information->blok();
        $room=$information->room();

        $array = array();

        //bilgiler diziye aktarılır
        $array["jop"]=$jop;
        $array["blok"]=$blok;
        $array["room"]=$room;

        echo json_encode($array);
    }

?>