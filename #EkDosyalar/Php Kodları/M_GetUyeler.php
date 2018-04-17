<?php

include 'Baglan.php';



if($_POST){

    $baglanti=(new Baglan())->basla();
    $baglanti->select_db("Admin");

    $array = array();

    $postControl=$_POST["post"];


    $i=0;
    $result=$baglanti->query("SELECT * FROM Uyeler WHERE meslek<>'admin'");
    while ($value = mysqli_fetch_object($result)){

        $array[$i]["id"]=$value->id;
        $array[$i]["username"]=$value->kullaniciAdi;
        $array[$i]["name"]=$value->isim;
        $array[$i]["surname"]=$value->soyisim;
        $array[$i]["email"]=$value->email;
        $array[$i]["telefon"]=$value->telefon;
        $array[$i]["jop"]=$value->meslek;
        $i++;
    }

    echo json_encode($array);

}


?>